import { koResponse, Oumi } from '@oumi-package/core/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../config';

export const errorHandler: Oumi.Handler<
  express.ErrorRequestHandler
> = container => async (err, req, res, next) => {
  container.get<Oumi.Logger>(SERVICE_ID.LOGGER).log(err);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(koResponse([err]));
};
