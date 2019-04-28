import { gql } from 'apollo-server';

export const Input = gql`
  input NewDebtRequestData {
    amount: Float!
    concept: String!
    currency: String!
    debtorId: String!
    id: ID!
    initialDate: String;
    limitDate: String;
    loanerId: String!
  }

  input ConfirmDebtRequestData {
    # DebtId
    id: ID!
  }

  input DenyDebtRequestData {
    # DebtId
    id: ID!
  }

  input DebtRequestsData {
    debtorId: ID!
  }
`;
