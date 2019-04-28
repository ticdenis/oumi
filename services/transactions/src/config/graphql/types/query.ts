import { gql } from 'apollo-server';

export const Query = gql`
  type Query {
    debtRequests(input: DebtRequestsData!): [DebtRequestResponse!]!
    payments(input: PaymentsData!): [PaymentResponse!]!
  }
`;
