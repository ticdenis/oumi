import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../shared';

import { movementsGetController } from '.';

export const movementsRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [jwtMiddleware(container), movementsGetController(container)];
