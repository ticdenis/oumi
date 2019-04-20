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
  Mutation: {
    changePassword: MUTATION_RESOLVER.changePassword,
    newContactRequest: MUTATION_RESOLVER.newContactRequest,
    updateProfile: MUTATION_RESOLVER.updateProfile,
    userRegistration: MUTATION_RESOLVER.userRegistration,
  },
  Query: {
    profile: QUERY_RESOLVER.profile,
    userContacts: QUERY_RESOLVER.userContacts,
    userToken: QUERY_RESOLVER.userToken,
  },
};
