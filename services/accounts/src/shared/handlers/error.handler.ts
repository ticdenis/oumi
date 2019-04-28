import { koResponse, Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';

export const errorHandler: Oumi.Handler<
  express.ErrorRequestHandler
> = container => (err, req, res, next) => {
  container.get<Oumi.Logger>(SERVICE_ID.LOGGER).log(JSON.stringify(err));

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(koResponse([err]));
};
