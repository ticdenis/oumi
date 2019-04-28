import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import {
  userTokenPostController,
  userTokenValidatorHandler,
} from '../user-token';

export const userTokenRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  userTokenValidatorHandler(container),
  userTokenPostController(container),
];
