import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import {
  userRegistrationPostController,
  userRegistrationValidatorHandler,
} from '../user-registration';

export const userRegistrationRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  userRegistrationValidatorHandler(container),
  userRegistrationPostController(container),
];
