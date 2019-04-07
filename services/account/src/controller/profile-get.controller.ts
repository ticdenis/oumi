import { okResponse, Oumi, QueryBus } from '@oumi-package/core/lib';
import { ProfileQuery, UserId } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../config';

import { defaultCatchMappingExceptions } from './util';

export const profileGetController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<QueryBus>(SERVICE_ID.BUS.QUERY)
    .ask(
      new ProfileQuery({
        id: container.get<UserId>(SERVICE_ID.USER_ID).value,
      }),
    )
    .then(profile => {
      res.status(HttpStatus.OK).json(okResponse(profile));
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
