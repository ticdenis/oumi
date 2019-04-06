import {
  DomainError,
  koResponse,
  okResponse,
  Oumi,
  QueryBus,
  ValueObjectDomainError,
} from '@oumi-package/core/lib';
import { UserTokenQuery } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../config';

export const userTokenPostController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<QueryBus>(SERVICE_ID.BUS.QUERY)
    .ask(new UserTokenQuery(req.body))
    .then(token => {
      res.status(HttpStatus.OK).json(okResponse(token));
      next();
    })
    .catch(err => {
      if (!(err instanceof DomainError)) {
        next(err);
      } else if (err instanceof ValueObjectDomainError) {
        res.status(HttpStatus.BAD_REQUEST).json(koResponse([err]));
      } else {
        res.status(HttpStatus.CONFLICT).json(koResponse([err]));
      }
    });
