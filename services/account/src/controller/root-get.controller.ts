import { okResponse, Oumi } from '@oumi-package/core/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

export const rootGetController: Oumi.Controller<
  express.Handler
> = container => async (_, res) => {
  res.status(HttpStatus.OK).json(okResponse('Account service'));
};
