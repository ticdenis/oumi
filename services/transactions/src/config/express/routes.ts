import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { healthzRouter } from '../../features/healthz';
import { newDebtRequestRouter } from '../../features/new-debt-request';
import { rootRouter } from '../../features/root';

export function loadRoutes(
  app: express.Application,
  container: Oumi.Container,
) {
  app.get('/', rootRouter(container));

  app.get('/healthz', healthzRouter(container));

  app.post('/debts/requests', newDebtRequestRouter(container));
}
