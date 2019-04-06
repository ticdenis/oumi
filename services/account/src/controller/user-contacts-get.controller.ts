import { UserContactsQuery } from '@oumi-package/contact';
import {
  DomainError,
  koResponse,
  okResponse,
  Oumi,
  QueryBus,
  ValueObjectDomainError,
} from '@oumi-package/core/lib';
import { UserId } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../config';

export const userContactsGetController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<QueryBus>(SERVICE_ID.BUS.QUERY)
    .ask(
      new UserContactsQuery({
        id: container.get<UserId>(SERVICE_ID.USER_ID).value,
      }),
    )
    .then(contacts => {
      res.status(HttpStatus.OK).json(okResponse(contacts));
      next();
    })
    .catch(err => {
      if (!(err instanceof DomainError)) {
        next(err);
      } else if (err instanceof ValueObjectDomainError) {
        res.status(HttpStatus.BAD_REQUEST).json(koResponse([err]));
      } else {
        res.status(HttpStatus.NOT_FOUND).json(koResponse([err]));
      }
    });
