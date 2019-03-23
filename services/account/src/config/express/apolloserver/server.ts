import { Oumi } from '@oumi-package/core';

import { ApolloServer } from 'apollo-server-express';

import { resolvers } from '../../../graphql/apolloserver/resolvers';
import { typeDefs } from '../../../graphql/apolloserver/schema';

export const loadApolloServer = (container: Oumi.Container) =>
  new ApolloServer({
    context: () => {
      return { container };
    },
    resolvers,
    typeDefs,
  });
