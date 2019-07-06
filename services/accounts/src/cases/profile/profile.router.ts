import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';
import { profileGetController } from '../profile';

export const profileRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [jwtMiddleware(container), profileGetController(container)];
