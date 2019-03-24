import { Oumi } from '@oumi-package/core/lib';

import express from 'express';

import {
  healthzGetController,
  rootGetController,
  userRegistrationPostController,
} from '../../controller/express';
import { userRegistrationValidatorHandler } from '../../handler/io-express';

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
}
