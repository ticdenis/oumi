import {
  UserCommandRepository,
  UserQueryRepository,
  userRegistration,
  userRegistrationCommand,
  userRegistrationCommandHandler,
} from '@oumi-package/user';

import express from 'express';
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
    })
    .decode(req.body); // TODO: Use UserRegistrationInput!

  if (validation.isLeft()) {
    res.status(400).json(validation.value);
    return;
  }

  const input = validation.value;

  const service = userRegistration(
    container.get<UserQueryRepository>('user.query.repository'),
    container.get<UserCommandRepository>('user.command.repository'),
  );
  const commandHandler = userRegistrationCommandHandler(service);
  const command = userRegistrationCommand(input);

  try {
    await commandHandler(command);

    res.status(201).json();
  } catch (err) {
    res.status(400).json(err);
  }
};
