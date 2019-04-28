import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import {
  newContactRequestPostController,
  newContactRequestValidatorHandler,
} from '.';

export const newContactRequestRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  newContactRequestValidatorHandler(container),
  newContactRequestPostController(container),
];
