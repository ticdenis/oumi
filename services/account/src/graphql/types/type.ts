import { gql } from 'apollo-server';

// tslint:disable-next-line: variable-name
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
`;
