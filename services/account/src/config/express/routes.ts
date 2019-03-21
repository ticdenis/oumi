import { Oumi } from '@oumi-package/core';

import express from 'express';

import {
  healthzGetController,
  userRegistrationPostController,
} from '../../controller';

export function loadRoutes(
  app: express.Application,
  container: Oumi.Container,
) {
  app.get('/healthz', healthzGetController(container));

  app.post('/users', userRegistrationPostController(container));
}
