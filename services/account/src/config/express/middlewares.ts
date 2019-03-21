import { koResponse } from '@oumi-package/core';

import express from 'express';
import helmet from 'helmet';
import * as HttpStatus from 'http-status-codes';
import morgan from 'morgan';

export function loadBeforeMiddlewares(app: express.Application) {
  app.use(helmet());

  app.use(morgan('combined'));

  app.use(express.json());
}

export function loadAfterMiddlewares(app: express.Application) {
  app.use((err: Error, req: any, res: express.Response) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      koResponse([
        {
          code: err.name,
          message: err.message,
        },
      ]),
    );
  });
}
