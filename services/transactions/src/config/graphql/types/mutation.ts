import { gql } from 'apollo-server';

export const Mutation = gql`
  type Mutation {
    confirmDebtRequest(input: ConfirmDebtRequestData!): Boolean
    denyDebtRequest(input: DenyDebtRequestData!): Boolean
    newDebtRequest(input: NewDebtRequestData!): Boolean
  }
`;
