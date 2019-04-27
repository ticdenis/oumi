import { ConfirmContactRequestCommand } from '@oumi-package/contact';
import { CommandBus, okResponse, Oumi } from '@oumi-package/shared/lib/core';
import { UserId } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as R from 'ramda';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../util';

export const confirmContactRequestPutController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND)
    .dispatch(
      new ConfirmContactRequestCommand(
        R.assoc(
          'contactRequestId',
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
