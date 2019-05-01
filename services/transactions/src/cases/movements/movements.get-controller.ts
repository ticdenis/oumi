import { MovementsQuery } from '@oumi-package/movement/lib/application';
import { okResponse, Oumi, QueryBus } from '@oumi-package/shared/lib/core';
import { UserId } from '@oumi-package/shared/lib/domain/user.props';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const movementsGetController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY)
    .ask(
      new MovementsQuery({
        debtorId: container.get<UserId>(SERVICE_ID.USER_ID).value,
      }),
    )
    .then(response => {
      res.status(HttpStatus.OK).json(okResponse(response));
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
