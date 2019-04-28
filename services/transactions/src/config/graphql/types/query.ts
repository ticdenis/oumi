import { gql } from 'apollo-server';

export const Query = gql`
  type Query {
    debtRequests(input: DebtRequestsData!): [DebtRequestsResponse!]!
  }
`;
