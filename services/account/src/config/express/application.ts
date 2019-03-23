import { Oumi } from '@oumi-package/core/lib';

import express from 'express';

import { loadBuses } from './buses';
import { loadAfterMiddlewares, loadBeforeMiddlewares } from './middlewares';
import { loadRepositories } from './repositories';
import { loadRoutes } from './routes';

export const loadApplication = (
  container: Oumi.Container,
): Oumi.Application => {
  loadRepositories(container);

  loadBuses(container);

  const app = express();

  loadBeforeMiddlewares(app, container);

  loadRoutes(app, container);

  loadAfterMiddlewares(app, container);

  return {
    listen: app.listen.bind(app),
  };
};
