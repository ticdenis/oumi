import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler, persistDomainEventsHandler } from '../../util';
import { loadApolloServer } from '../graphql/server';

export function loadBeforeMiddlewares(
  app: express.Application,
  container: Oumi.Container,
) {
  app.use(helmet());

  app.use(morgan('combined'));

  app.use(express.json());

  loadApolloServer(container).applyMiddleware({ app });
}

export function loadAfterMiddlewares(
  app: express.Application,
  container: Oumi.Container,
) {
  app.use(persistDomainEventsHandler(container));

  app.use(errorHandler(container));
}
