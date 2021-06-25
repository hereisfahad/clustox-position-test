import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import { createUser, findUser, validatePassword } from '../lib/user'
import { setLoginSession, getLoginSession } from '../lib/auth'
import { removeTokenCookie } from '../lib/auth-cookies'

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req)
        if (session) {
          return findUser({ email: session.email })
        }
      } catch (error) {
        throw new AuthenticationError(
          'Authentication token is invalid, please log in'
        )
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, context, _info) {
      const usernameAlreadyExists: any = await findUser({ username: args.input.username })
      if (usernameAlreadyExists) throw new UserInputError('Username not available.')
      const emailAleradyExists: any = await findUser({ email: args.input.email })
      if (emailAleradyExists) throw new UserInputError('User with this email already exists.')

      const user: any = await createUser(args.input)
      const session = {
        id: user.id,
        email: user.email,
      }
      await setLoginSession(context.res, session)
      return { user }
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ email: args.input.email })

      if (user && (await validatePassword(user, args.input.password))) {
        const session = {
          id: user.id,
          email: user.email,
        }
        await setLoginSession(context.res, session)
        return { user }
      }

      throw new UserInputError('Invalid email and password combination')
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res)
      return true
    },
  },
}
