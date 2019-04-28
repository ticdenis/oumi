import { NewPayCommand } from '@oumi-package/payment/lib/application';
import { CommandBus, okResponse, Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const newPayPostController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND)
    .dispatch(new NewPayCommand(req.body))
    .then(() => {
      res.status(HttpStatus.CREATED).json(okResponse());
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
