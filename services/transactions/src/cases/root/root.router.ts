import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { rootGetController } from '../root';

export const rootRouter: Oumi.Router<express.RequestHandler[]> = container => [
  rootGetController(container),
];
