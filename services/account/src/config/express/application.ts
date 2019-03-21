import { Oumi } from '@oumi-package/core/lib';

import express from 'express';

import { loadBuses } from './buses';
import { loadAfterMiddlewares, loadBeforeMiddlewares } from './middlewares';
import { loadRepositories } from './repositories';
import { loadRoutes } from './routes';

export const loadApplication = (container: Oumi.Container) => {
  loadRepositories(container);

  loadBuses(container);

  const app = express();

  loadBeforeMiddlewares(app);

  loadRoutes(app, container);

  loadAfterMiddlewares(app);

  return {
    listen: app.listen.bind(app),
  };
};
