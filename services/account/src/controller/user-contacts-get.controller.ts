import { UserContactsQuery } from '@oumi-package/contact';
import { okResponse, Oumi, QueryBus } from '@oumi-package/core/lib';
import { UserId } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../config';

import { defaultCatchMappingExceptions } from './util';

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
    .catch(defaultCatchMappingExceptions(req, res, next));
