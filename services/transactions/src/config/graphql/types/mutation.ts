import { gql } from 'apollo-server';

export const Mutation = gql`
  type Mutation {
    newDebtRequest(input: NewDebtRequestData!): Boolean
  }
`;
