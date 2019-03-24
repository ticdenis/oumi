import { koResponse, Oumi, validationReporter } from '@oumi-package/core/lib';

import express from 'express';
import { Either } from 'fp-ts/lib/Either';
import * as HttpStatus from 'http-status-codes';
import { Errors } from 'io-ts';

export type ValidatorHandler = <T>(
  validator: Oumi.Validator<Either<Errors, T>>,
) => Oumi.Handler<express.Handler>;

export const simpleValidatorHandler: ValidatorHandler = validator => container => (
  req,
  res,
  next,
) => {
  const validation = validator(req.body);

  if (validation.isLeft()) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json(koResponse(validationReporter(validation.value)));

    return;
  }

  next();
};

export * from './user-registration.validator-handler';
