import { okResponse, Oumi, QueryBus } from '@oumi-package/shared/lib/core';
import { UserTokenQuery } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const userTokenPostController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY)
    .ask(new UserTokenQuery(req.body))
    .then(token => {
      res.status(HttpStatus.OK).json(okResponse(token));
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
