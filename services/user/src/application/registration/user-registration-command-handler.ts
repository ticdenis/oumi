import {
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userPasswordVO,
} from '../../domain/value-object';

import { UserRegistration } from './user-registration';
import { UserRegistrationCommand } from './user-registration-command';

export type UserRegistrationCommandHandler = (
  service: UserRegistration,
) => (command: UserRegistrationCommand) => Promise<void>;

export const userRegistrationCommandHandler: UserRegistrationCommandHandler = service => async command => {
  const input = {
    email: userEmailVO(command.data.email),
    firstname: userFirstnameVO(command.data.firstname),
    id: userIdVO(command.data.id),
    lastname: userLastnameVO(command.data.lastname),
    password: userPasswordVO(command.data.password),
  };

  const response = await service(input);

  return response.isLeft() ? Promise.reject(response.value) : Promise.resolve();
};
