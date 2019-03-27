import { Oumi } from '@oumi-package/core/lib';

import express from 'express';

import {
  healthzGetController,
  rootGetController,
  userRegistrationPostController,
  userTokenPostController,
} from '../../controller/express';
import {
  userRegistrationValidatorHandler,
  userTokenValidatorHandler,
} from '../../handler/io-express';

export function loadRoutes(
  app: express.Application,
  container: Oumi.Container,
) {
  app.get('/', rootGetController(container));

  app.get('/healthz', healthzGetController(container));

  app.post(
    '/users',
    userRegistrationValidatorHandler(container),
    userRegistrationPostController(container),
  );

  app.post(
    '/auth',
    userTokenValidatorHandler(container),
    userTokenPostController(container),
  );
}
