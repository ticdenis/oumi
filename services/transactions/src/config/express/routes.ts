import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { confirmDebtRequestRouter } from '../../cases/confirm-debt-request';
import { denyDebtRequestRouter } from '../../cases/deny-debt-request';
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

  app.put('/debts/requests/confirm', confirmDebtRequestRouter(container));

  app.put('/debts/requests/deny', denyDebtRequestRouter(container));
}
