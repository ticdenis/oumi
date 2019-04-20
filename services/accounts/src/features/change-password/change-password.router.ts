import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../util';
import {
  changePasswordPutController,
  changePasswordValidatorHandler,
} from '../change-password';

export const changePasswordRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  changePasswordValidatorHandler(container),
  changePasswordPutController(container),
];
