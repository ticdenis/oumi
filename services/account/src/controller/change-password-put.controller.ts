import {
  CommandBus,
  DomainError,
  koResponse,
  okResponse,
  Oumi,
  ValueObjectDomainError,
} from '@oumi-package/core/lib';
import { ChangePasswordCommand, UserId } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as R from 'ramda';

import { SERVICE_ID } from '../config';

export const changePasswordPutController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<CommandBus>(SERVICE_ID.BUS.COMMAND)
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
    .catch(err => {
      if (!(err instanceof DomainError)) {
        next(err);
      } else if (err instanceof ValueObjectDomainError) {
        res.status(HttpStatus.BAD_REQUEST).json(koResponse([err]));
      } else {
        switch (err.code) {
          case 'USER_NOT_FOUND':
            res.status(HttpStatus.NOT_FOUND).json(koResponse([err]));
            break;
          default:
            res.status(HttpStatus.CONFLICT).json(koResponse([err]));
        }
      }
    });
