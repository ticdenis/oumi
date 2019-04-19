import {
  DomainError,
  koResponse,
  ValueObjectDomainError,
} from '@oumi-package/shared/lib/core';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

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
