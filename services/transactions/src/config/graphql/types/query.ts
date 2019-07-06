import { gql } from 'apollo-server';

export const Query = gql`
  type Query {
    debtRequests(input: DebtRequestsData!): [DebtRequestResponse!]!
    movements(input: MovementsData!): [MovementResponse!]!
    payments(input: PaymentsData!): [PaymentResponse!]!
  }
`;
