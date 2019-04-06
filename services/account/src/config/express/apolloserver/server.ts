import { Oumi } from '@oumi-package/core';

import { ApolloServer } from 'apollo-server-express';

import { resolvers } from '../../../graphql/resolvers';
import { typeDefs } from '../../../graphql/schema';

export const loadApolloServer = (container: Oumi.Container) =>
  new ApolloServer({
    context: () => {
      return { container };
    },
    resolvers,
    typeDefs,
  });
