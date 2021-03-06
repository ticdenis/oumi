import { CommandHandler, eitherToPromise } from '@oumi-package/shared/lib/core';

import {
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
} from '../../domain';

import { UserRegistrationCommand } from './user-registration.command';
import { UserRegistrationService } from './user-registration.service';

export type UserRegistrationCommandHandler = (
  service: UserRegistrationService,
) => CommandHandler<UserRegistrationCommand>;

export const userRegistrationHandler: UserRegistrationCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      email: userEmailVO(command.data.email),
      firstname: userFirstnameVO(command.data.firstname),
      id: userIdVO(command.data.id),
      lastname: userLastnameVO(command.data.lastname),
      nickname: userNicknameVO(command.data.nickname),
      password: userPasswordVO(command.data.password),
      phone: userPhoneVO(command.data.phone),
    }),
  );
