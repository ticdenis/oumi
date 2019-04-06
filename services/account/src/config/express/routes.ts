import { Oumi } from '@oumi-package/core/lib';

import express from 'express';

import {
  changePasswordPutController,
  healthzGetController,
  profileGetController,
  rootGetController,
  updateProfilePutController,
  userContactsGetController,
  userRegistrationPostController,
  userTokenPostController,
} from '../../controller/express';
import { jwtMiddleware } from '../../handler/express';
import {
  changePasswordValidatorHandler,
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

  app.put(
    '/password',
    jwtMiddleware(container),
    changePasswordValidatorHandler(container),
    changePasswordPutController(container),
  );

  app.get(
    '/users/contacts',
    jwtMiddleware(container),
    userContactsGetController(container),
  );
}
