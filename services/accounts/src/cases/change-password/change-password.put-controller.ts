import { CommandBus, okResponse, Oumi } from '@oumi-package/shared/lib/core';
import { ChangePasswordCommand, UserId } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as R from 'ramda';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const changePasswordPutController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND)
    .dispatch(
      new ChangePasswordCommand(
        R.assoc(
          'id',
          container.get<UserId>(SERVICE_ID.USER_ID).value,
          req.body,
        ),
      ),
    )
    .then(() => {
      res.status(HttpStatus.OK).json(okResponse());
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
