import {
  DomainError,
  koResponse,
  Oumi,
  validationReporter,
  ValueObjectDomainError,
} from '@oumi-package/shared/lib/core';

import express from 'express';
import { Either } from 'fp-ts/lib/Either';
import * as HttpStatus from 'http-status-codes';
import { Errors } from 'io-ts';

export const defaultCatchMappingExceptions: express.Handler = (
  _,
  res,
  next,
) => (err: any) => {
  if (!(err instanceof DomainError)) {
    next(err);
  } else if (err instanceof ValueObjectDomainError) {
    res.status(HttpStatus.BAD_REQUEST).json(koResponse([err]));
  } else {
    if (
      err.code.indexOf('NOT_FOUND') !== -1 ||
      err.code.indexOf('NOT_EXIST') !== -1
    ) {
      res.status(HttpStatus.NOT_FOUND).json(koResponse([err]));
    } else {
      res.status(HttpStatus.CONFLICT).json(koResponse([err]));
    }
  }
};

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
