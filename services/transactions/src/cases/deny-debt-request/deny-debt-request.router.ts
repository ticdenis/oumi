import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import {
  denyDebtRequestPutController,
  denyDebtRequestValidatorHandler,
} from '.';

export const denyDebtRequestRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  denyDebtRequestValidatorHandler(container),
  denyDebtRequestPutController(container),
];
