import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import { newPayPostController, newPayValidatorHandler } from '.';

export const newPayRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  newPayValidatorHandler(container),
  newPayPostController(container),
];
