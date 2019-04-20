import { gql } from 'apollo-server';

// tslint:disable-next-line: variable-name
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
`;
