import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import { paymentsGetController, paymentsValidatorHandler } from '.';

export const paymentsRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  paymentsValidatorHandler(container),
  paymentsGetController(container),
];
