import { gql } from 'apollo-server';

export const Type = gql`
  type ProfileResponse {
    email: String!
    firstname: String!
    id: ID!
    lastname: String!
    nickname: String!
    phone: String!
  }

  type UserContactDebt {
    amount: Float!
    currency: String!
  }

  type UserContactResponse {
    debts: [UserContactDebt!]!
    firstname: String!
    id: ID!
    lastname: String!
    nickname: String!
  }

  type ContactRequestResponse {
    id: ID!
  }
`;
