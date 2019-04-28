import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import {
  confirmContactRequestPutController,
  confirmContactRequestValidatorHandler,
} from '.';

export const confirmContactRequestRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  confirmContactRequestValidatorHandler(container),
  confirmContactRequestPutController(container),
];
