import { PaymentsQuery } from '@oumi-package/payment/lib/application';
import { okResponse, Oumi, QueryBus } from '@oumi-package/shared/lib/core';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const paymentsGetController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY)
    .ask(new PaymentsQuery(req.body))
    .then(response => {
      res.status(HttpStatus.OK).json(okResponse(response));
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
