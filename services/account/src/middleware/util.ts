import { koResponse, Oumi, validationReporter } from '@oumi-package/core/lib';

import express from 'express';
import { Either } from 'fp-ts/lib/Either';
import * as HttpStatus from 'http-status-codes';
import { Errors } from 'io-ts';

export type ValidatorHandler = <T>(
  validator: Oumi.Validator<Either<Errors, T>>,
) => Oumi.Handler<express.Handler>;

const validatorHandler: (
  requestProp: keyof express.Request,
) => ValidatorHandler = requestProp => validator => () => (req, res, next) => {
  const validation = validator(req[requestProp]);

  if (validation.isLeft()) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json(koResponse(validationReporter(validation.value)));

    return;
  }

  next();
};

export const simpleBodyValidatorHandler = validatorHandler('body');

export const simpleParamsValidatorHandler = validatorHandler('params');
