import express from 'express';
import { getStatusText, OK } from 'http-status-codes';

import { Controller } from '../dsl';

export const healthzGetController: Controller<express.Handler> = () => (
  _,
  res,
) => {
  res.status(OK).send(getStatusText(OK));
};
