import {
  CommandBus,
  koResponse,
  okResponse,
  Oumi,
  validationReporter,
} from '@oumi-package/core/lib';
import {
  IUserRegistrationData,
  UserDomainError,
  UserRegistrationCommand,
} from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';

export const userRegistrationPostController: Oumi.Controller<
  express.Handler
> = container => async (req, res, next) => {
  IUserRegistrationData.decode(req.body).fold(
    errors => {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(koResponse(validationReporter(errors)));
    },
    input => {
      container
        .get<CommandBus>('command-bus')
        .dispatch(new UserRegistrationCommand(input))
        .then(() => {
          container.get<Oumi.Logger>(SERVICE_ID.LOGGER).log('User created!');
          res.status(HttpStatus.CREATED).json(okResponse());
        })
        .catch((err: Error | UserDomainError) => {
          if (!(err instanceof UserDomainError)) {
            next(err);
            return;
          }

          res
            .status(HttpStatus.BAD_REQUEST)
            .json(koResponse([{ code: err.code, message: err.message }]));
        });
    },
  );
};
