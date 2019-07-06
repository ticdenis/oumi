import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import {
  confirmDebtRequestPutController,
  confirmDebtRequestValidatorHandler,
} from '.';

export const confirmDebtRequestRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  confirmDebtRequestValidatorHandler(container),
  confirmDebtRequestPutController(container),
];
