import { gql } from 'apollo-server';

export const Type = gql`
  type DebtRequestResponse {
    amount: Float!
    concept: String!
    currency: String!
    id: ID!
    initialDate: String!
    limitDate: String!
    loanerId: ID!
  }

  type PaymentDebtResponse {
    id: ID!
    loanerId: ID!
    quantity: Float!
  }

  type PaymentResponse {
    debt: PaymentDebtResponse!
    id: ID!
    message: String
    occurredOn: String!
    quantity: Float!
  }

  type MovementResponse {
    amount: Float!
    concept: String!
    date: String!
    debtId: ID!
    message: String
    type: String!
  }
`;
