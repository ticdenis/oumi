import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import {
  denyContactRequestPutController,
  denyContactRequestValidatorHandler,
} from '.';

export const denyContactRequestRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  denyContactRequestValidatorHandler(container),
  denyContactRequestPutController(container),
];
