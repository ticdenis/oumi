import { CommandBus } from '@oumi-package/shared';
import { userRegistrationCommand } from '@oumi-package/user';

import express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as t from 'io-ts';

import { Controller } from '../dsl';

export const userRegistrationPostController: Controller<
  express.Handler
> = container => async (req, res) => {
  const validation = t
    .interface({
      email: t.string,
      firstname: t.string,
      id: t.string,
      lastname: t.string,
      password: t.string,
      phone: t.string,
    })
    .decode(req.body); // TODO: Use UserRegistrationInput!

  if (validation.isLeft()) {
    res.status(HttpStatus.BAD_REQUEST).json(validation.value);
    return;
  }

  container
    .get<CommandBus>('command-bus')
    .dispatch(userRegistrationCommand(validation.value))
    .then(() => res.status(HttpStatus.CREATED).json())
    .catch((err: Error) =>
      res
        .status(
          'user_already_exists' === err.name
            ? HttpStatus.BAD_REQUEST
            : HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({ code: err.name, message: err.message }),
    );
};
