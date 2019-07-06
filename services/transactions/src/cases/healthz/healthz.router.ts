import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';

import { healthzGetController } from '../healthz';

export const healthzRouter: Oumi.Router<
  express.RequestHandler[]
> = container => [healthzGetController(container)];
