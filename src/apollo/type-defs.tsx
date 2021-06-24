import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    username: String!
  }

  input SignUpInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`
