import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { jwtMiddleware } from '../../util';
import { userContactsGetController } from '../user-contacts';

export const userContactsRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [
  jwtMiddleware(container),
  userContactsGetController(container),
];
