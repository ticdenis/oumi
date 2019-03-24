import { Oumi } from '@oumi-package/core/lib';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import {
  errorHandler,
  persistDomainEventsHandler,
} from '../../handler/express';

import { loadApolloServer } from './apolloserver/server';

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
