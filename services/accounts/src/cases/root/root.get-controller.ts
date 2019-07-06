import { okResponse, Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

export const rootGetController: Oumi.Controller<express.Handler> = () => (
  _,
  res,
) => {
  res.status(HttpStatus.OK).json(okResponse('Accounts service'));
};
