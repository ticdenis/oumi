import { ContactRequestCommand } from '@oumi-package/contact';
import { CommandBus, okResponse, Oumi } from '@oumi-package/shared/lib/core';
import { UserId } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as R from 'ramda';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const newContactRequestPostController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND)
    .dispatch(
      new ContactRequestCommand(
        R.assoc(
          'requesterId',
          container.get<UserId>(SERVICE_ID.USER_ID).value,
          req.body,
        ),
      ),
    )
    .then(() => {
      res.status(HttpStatus.CREATED).json(okResponse());
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
