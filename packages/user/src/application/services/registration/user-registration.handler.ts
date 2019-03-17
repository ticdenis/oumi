import { CommandHandler } from '@oumi-package/shared';

import {
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
} from '../../../domain';

import { UserRegistrationCommand } from './user-registration.command';
import { UserRegistration } from './user-registration.service';

export type UserRegistrationCommandHandler = (
  service: UserRegistration,
) => CommandHandler<UserRegistrationCommand>;

export const userRegistrationCommandHandler: UserRegistrationCommandHandler = service => async command => {
  const input = {
    email: userEmailVO(command.data.email),
    firstname: userFirstnameVO(command.data.firstname),
    id: userIdVO(command.data.id),
    lastname: userLastnameVO(command.data.lastname),
    nickname: userNicknameVO(command.data.nickname),
    password: userPasswordVO(command.data.password),
    phone: userPhoneVO(command.data.phone),
  };

  const response = await service(input);

  return response.isLeft() ? Promise.reject(response.value) : Promise.resolve();
};
