import { Oumi } from '@oumi-package/shared/lib/core';

import { ApolloServer } from 'apollo-server-express';

import { resolvers, typeDefs } from './schema';

export const loadApolloServer = (container: Oumi.Container) =>
  new ApolloServer({
    context: () => {
      return { container };
    },
    resolvers,
    typeDefs,
  });
