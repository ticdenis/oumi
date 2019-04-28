import { gql } from 'apollo-server';

export const Mutation = gql`
  type Mutation {
    confirmDebtRequest(input: ConfirmDebtRequestData!): Boolean
    denyDebtRequest(input: DenyDebtRequestData!): Boolean
    endDebt(input: EndDebtData!): Boolean
    newDebtRequest(input: NewDebtRequestData!): Boolean
    newPay(input: NewPayData!): Boolean
  }
`;
