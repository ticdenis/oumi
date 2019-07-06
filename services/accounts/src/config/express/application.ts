import { nullableStringVO, Oumi } from '@oumi-package/shared/lib/core';

import { createTerminus } from '@godaddy/terminus';
import express from 'express';
import http from 'http';

import { SERVICE_ID } from '..';

import { loadBuses } from './buses';
import { loadAfterMiddlewares, loadBeforeMiddlewares } from './middlewares';
import { loadRepositories } from './repositories';
import { loadRoutes } from './routes';

export const loadApplication = (
  container: Oumi.Container,
): Oumi.Application => {
  container.set(SERVICE_ID.USER_ID, nullableStringVO(null));

  loadRepositories(container);

  loadBuses(container);

  const app = express();

  loadBeforeMiddlewares(app, container);

  loadRoutes(app, container);

  loadAfterMiddlewares(app, container);

  const logger = container.get<Oumi.Logger>(SERVICE_ID.LOGGER);
  const db = container.get<Oumi.Database>(SERVICE_ID.DB);
  const server = createTerminus(http.createServer(app), {
    logger: (msg, err) => logger.log(`Terminus: [msg] ${msg} [err] ${err}`),
    onSignal: () => Promise.all([() => db.disconnect()]),
  });

  return {
    listen: server.listen.bind(server),
  };
};
