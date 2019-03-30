import { Oumi } from '@oumi-package/core/lib';

import express from 'express';

import {
  healthzGetController,
  profileGetController,
  rootGetController,
  updateProfilePutController,
  userRegistrationPostController,
  userTokenPostController,
} from '../../controller/express';
import { jwtMiddleware } from '../../handler/express';
import {
  updateProfileValidatorHandler,
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

  app.get(
    '/profile',
    jwtMiddleware(container),
    profileGetController(container),
  );

  app.put(
    '/profile',
    jwtMiddleware(container),
    updateProfileValidatorHandler(container),
    updateProfilePutController(container),
  );
}
