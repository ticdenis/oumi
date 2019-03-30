import { CommandHandler, eitherToPromise } from '@oumi-package/core';

import {
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPhoneVO,
} from '../../domain';

import { UpdateProfileCommand, UpdateProfileService } from '.';

export type UpdateProfileCommandHandler = (
  service: UpdateProfileService,
) => CommandHandler<UpdateProfileCommand>;

export const updateProfileHandler: UpdateProfileCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      firstname: userFirstnameVO(command.data.firstname),
      id: userIdVO(command.data.id),
      lastname: userLastnameVO(command.data.lastname),
      nickname: userNicknameVO(command.data.nickname),
      phone: userPhoneVO(command.data.phone),
    }),
  );
