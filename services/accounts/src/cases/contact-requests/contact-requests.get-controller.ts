import { ContactRequestsQuery } from '@oumi-package/contact/lib/application';
import { okResponse, Oumi, QueryBus } from '@oumi-package/shared/lib/core';
import { UserId } from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';
import { defaultCatchMappingExceptions } from '../../shared';

export const contactRequestsGetController: Oumi.Controller<
  express.Handler
> = container => (req, res, next) =>
  container
    .get<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY)
    .ask(
      new ContactRequestsQuery({
        id: container.get<UserId>(SERVICE_ID.USER_ID).value,
      }),
    )
    .then(contacts => {
      res.status(HttpStatus.OK).json(okResponse(contacts));
      next();
    })
    .catch(defaultCatchMappingExceptions(req, res, next));
