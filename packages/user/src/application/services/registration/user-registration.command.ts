import { Command } from '@oumi-package/core';

import * as t from 'io-ts';

// tslint:disable-next-line:variable-name
export const IUserRegistrationData = t.type({
  email: t.string,
  firstname: t.string,
  id: t.string,
  lastname: t.string,
  nickname: t.string,
  password: t.string,
  phone: t.string,
});

export type UserRegistrationData = t.TypeOf<typeof IUserRegistrationData>;

export class UserRegistrationCommand extends Command<UserRegistrationData> {}
