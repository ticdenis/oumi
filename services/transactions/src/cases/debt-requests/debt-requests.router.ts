import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import { debtRequestsGetController, debtRequestsValidatorHandler } from '.';

export const debtRequestsRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  debtRequestsValidatorHandler(container),
  debtRequestsGetController(container),
];
