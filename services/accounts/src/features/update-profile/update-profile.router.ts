import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../util';
import {
  updateProfilePutController,
  updateProfileValidatorHandler,
} from '../update-profile';

export const updateProfileRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  updateProfileValidatorHandler(container),
  updateProfilePutController(container),
];
