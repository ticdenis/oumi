import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { confirmDebtRequestRouter } from '../../cases/confirm-debt-request';
import { debtRequestsRouter } from '../../cases/debt-requests';
import { denyDebtRequestRouter } from '../../cases/deny-debt-request';
import { healthzRouter } from '../../cases/healthz';
import { newDebtRequestRouter } from '../../cases/new-debt-request';
import { newPayRouter } from '../../cases/new-pay';
import { paymentsRouter } from '../../cases/payments';
import { rootRouter } from '../../cases/root';

export function loadRoutes(
  app: express.Application,
  container: Oumi.Container,
) {
  app.get('/', rootRouter(container));

  app.get('/healthz', healthzRouter(container));

  app.get('/debts/requests', debtRequestsRouter(container));

  app.get('/payments', paymentsRouter(container));

  app.post('/debts/requests', newDebtRequestRouter(container));

  app.post('/payments', newPayRouter(container));

  app.put('/debts/requests/confirm', confirmDebtRequestRouter(container));

  app.put('/debts/requests/deny', denyDebtRequestRouter(container));
}
