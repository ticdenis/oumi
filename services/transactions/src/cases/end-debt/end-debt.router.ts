import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import { endDebtPutController, endDebtValidatorHandler } from '.';

export const endDebtRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  endDebtValidatorHandler(container),
  endDebtPutController(container),
];
