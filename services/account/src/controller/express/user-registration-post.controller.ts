import {
  CommandBus,
  DomainError,
  koResponse,
  okResponse,
  Oumi,
  validationReporter,
  ValueObjectDomainError,
} from '@oumi-package/core/lib';
import {
  IUserRegistrationData,
  UserRegistrationCommand,
} from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';

export const userRegistrationPostController: Oumi.Controller<
  express.Handler
> = container => async (req, res, next) => {
  const validation = IUserRegistrationData.decode(req.body);

  if (validation.isLeft()) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json(koResponse(validationReporter(validation.value)));
    return;
  }

  try {
    await container
      .get<CommandBus>(SERVICE_ID.BUS.COMMAND)
      .dispatch(new UserRegistrationCommand(validation.value));
    res.status(HttpStatus.CREATED).json(okResponse());
    next();
  } catch (err) {
    if (!(err instanceof DomainError)) {
      next(err);
    } else if (err instanceof ValueObjectDomainError) {
      res.status(HttpStatus.BAD_REQUEST).json(koResponse([err]));
    } else {
      res.status(HttpStatus.CONFLICT).json(koResponse([err]));
    }
  }
};
