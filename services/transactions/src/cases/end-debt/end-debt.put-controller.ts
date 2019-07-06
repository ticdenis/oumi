import { EndDebtCommand } from '@oumi-package/movement/lib/application';
import { CommandBus, okResponse, Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const endDebtPutController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND)
    .dispatch(new EndDebtCommand(req.body))
    .then(() => {
      res.status(HttpStatus.OK).json(okResponse());
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
