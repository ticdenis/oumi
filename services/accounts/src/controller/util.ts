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
    switch (err.code) {
      case 'CONTACT_NOT_FOUND':
      case 'USER_NOT_FOUND':
        res.status(HttpStatus.NOT_FOUND).json(koResponse([err]));
        break;
      default:
        res.status(HttpStatus.CONFLICT).json(koResponse([err]));
    }
  }
};
