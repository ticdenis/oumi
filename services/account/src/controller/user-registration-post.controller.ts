import { CommandBus } from '@oumi-package/core/lib';
import {
  userRegistrationCommand,
  UserRegistrationInputType,
} from '@oumi-package/user/lib';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { Controller, Logger, SERVICE_ID } from '../dsl';

import { ErrorFormat, koResponse, okResponse, validationReporter } from '.';

export const userRegistrationPostController: Controller<
  express.Handler
> = container => async (req, res) => {
  UserRegistrationInputType.decode(req.body).fold(
    errors => {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(koResponse<ErrorFormat>(validationReporter(errors)));
    },
    input => {
      container
        .get<CommandBus>('command-bus')
        .dispatch(userRegistrationCommand(input))
        .then(() => {
          container.get<Logger>(SERVICE_ID.LOGGER).log('User created!');
          res.status(HttpStatus.CREATED).json(okResponse());
        })
        .catch((err: Error) =>
          res
            .status(
              'user_already_exists' === err.name
                ? HttpStatus.BAD_REQUEST
                : HttpStatus.INTERNAL_SERVER_ERROR,
            )
            .json(
              koResponse<ErrorFormat>([
                { code: err.name, message: err.message },
              ]),
            ),
        );
    },
  );
};
