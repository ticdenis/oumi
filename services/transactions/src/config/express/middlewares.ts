import { Oumi } from '@oumi-package/shared/lib/core';

import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler, persistDomainEventsHandler } from '../../shared';
// import { loadApolloServer } from '../graphql/server';

export function loadBeforeMiddlewares(
  app: express.Application,
  container: Oumi.Container,
) {
  app.use(compression()); // enable gzip

  app.use(helmet()); // secure HTTP headers

  app.use(morgan('combined')); // log formatter HTTP requests

  app.use(express.json()); // parses incoming requests with JSON payloads

  // loadApolloServer(container).applyMiddleware({ app }); // graphQL
}

export function loadAfterMiddlewares(
  app: express.Application,
  container: Oumi.Container,
) {
  app.use(persistDomainEventsHandler(container));

  app.use(errorHandler(container));
}
