import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../util';

import {
  newDebtRequestPostController,
  newDebtRequestValidatorHandler,
} from './';

export const newDebtRequestRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  newDebtRequestValidatorHandler(container),
  newDebtRequestPostController(container),
];
