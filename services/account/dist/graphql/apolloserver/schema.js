"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
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
//# sourceMappingURL=schema.js.map