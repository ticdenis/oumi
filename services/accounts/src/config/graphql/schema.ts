import { gql } from 'apollo-server';

import { MUTATION_RESOLVER } from './resolvers/mutation';
import { QUERY_RESOLVER } from './resolvers/query';
import { Input } from './types/input';
import { Mutation } from './types/mutation';
import { Query } from './types/query';
import { Type } from './types/type';

export const typeDefs = gql`
  ${Query}
  ${Mutation}
  ${Input}
  ${Type}
`;

export const resolvers = {
  Mutation: MUTATION_RESOLVER,
  Query: QUERY_RESOLVER,
};
