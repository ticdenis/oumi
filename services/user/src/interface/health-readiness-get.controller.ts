import express from 'express';

import { Controller } from './dsl';

export const healthReadinessGetController: Controller<express.Handler> = () => (
  _,
  res,
) => res.status(200).send('Ready!');
