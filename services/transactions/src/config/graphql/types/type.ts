import { gql } from 'apollo-server';

export const Type = gql`
  type DebtRequestsResponse {
    amount: Float!
    concept: String!
    currency: String!
    id: ID!
    initialDate: String!
    limitDate: String!
    loanerId: ID!
  }
`;
