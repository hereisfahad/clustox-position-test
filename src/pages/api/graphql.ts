import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import mongoose from "mongoose";

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return ctx
  },
})

const dbConnect = async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}

dbConnect()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
