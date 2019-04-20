import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../util';
import {
  userRegistrationPostController,
  userRegistrationValidatorHandler,
} from '../user-registration';

export const userRegistrationRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  userRegistrationValidatorHandler(container),
  userRegistrationPostController(container),
];
