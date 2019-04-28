import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { healthzRouter } from '../../cases/healthz';
import { newDebtRequestRouter } from '../../cases/new-debt-request';
import { rootRouter } from '../../cases/root';

export function loadRoutes(
  app: express.Application,
  container: Oumi.Container,
) {
  app.get('/', rootRouter(container));

  app.get('/healthz', healthzRouter(container));

  app.post('/debts/requests', newDebtRequestRouter(container));
}
