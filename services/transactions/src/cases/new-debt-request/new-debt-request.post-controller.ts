import { NewDebtRequestCommand } from '@oumi-package/debt/lib/application';
import { CommandBus, okResponse, Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const newDebtRequestPostController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND)
    .dispatch(new NewDebtRequestCommand(req.body))
    .then(() => {
      res.status(HttpStatus.CREATED).json(okResponse());
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
