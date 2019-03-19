import { Command, command } from '@oumi-package/core';

import * as t from 'io-ts';

// tslint:disable-next-line:variable-name
export const UserRegistrationInputType = t.type({
  email: t.string,
  firstname: t.string,
  id: t.string,
  lastname: t.string,
  nickname: t.string,
  password: t.string,
  phone: t.string,
});

export type UserRegistrationInput = t.TypeOf<typeof UserRegistrationInputType>;

// tslint:disable-next-line:variable-name
export const UserRegistrationCommandName = 'UserRegistrationCommand';

export type UserRegistrationCommand = Command<UserRegistrationInput>;

export const userRegistrationCommand = (
  input: UserRegistrationInput,
): UserRegistrationCommand => command(input, UserRegistrationCommandName);
