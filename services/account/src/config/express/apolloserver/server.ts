import { Oumi } from '@oumi-package/core';

import { ApolloServer } from 'apollo-server-express';

import { resolvers, typeDefs } from '../../../graphql/schema';

export const loadApolloServer = (container: Oumi.Container) =>
  new ApolloServer({
    context: () => {
      return { container };
    },
    resolvers,
    typeDefs,
  });
