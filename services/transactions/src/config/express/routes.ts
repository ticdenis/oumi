import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { healthzGetController, rootGetController } from '../../controller';

export function loadRoutes(
  app: express.Application,
  container: Oumi.Container,
) {
  app.get('/', rootGetController(container));

  app.get('/healthz', healthzGetController(container));
}
