import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Mutation {
    userRegistration(input: UserRegistrationInput!): Boolean
  }

  input UserRegistrationInput {
    email: String!
    firstname: String!
    id: ID!
    lastname: String!
    nickname: String!
    password: String!
    phone: String!
  }
`;
