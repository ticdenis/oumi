import { koResponse, okResponse, Oumi } from '@oumi-package/core/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../config';

export const healthzGetController: Oumi.Controller<
  express.Handler
> = container => async (_, res) => {
  const db = container.get<Oumi.Database>(SERVICE_ID.DB);

  if (!(await db.isConnected())) {
    res.status(HttpStatus.SERVICE_UNAVAILABLE).json(
      koResponse([
        {
          code: 'DATABASE_NOT_AVAILABLE',
          message: 'Database not available',
        },
      ]),
    );

    return;
  }

  res
    .status(HttpStatus.OK)
    .json(okResponse(HttpStatus.getStatusText(HttpStatus.OK)));
};
