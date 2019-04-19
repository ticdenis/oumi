import {
  CommandHandler,
  eitherToPromise,
  stringVO,
} from '@oumi-package/shared/lib/core';

import { userIdVO, userPasswordVO } from '../../domain';

import { ChangePasswordCommand, ChangePasswordService } from '.';

export type ChangePasswordCommandHandler = (
  service: ChangePasswordService,
) => CommandHandler<ChangePasswordCommand>;

export const changePasswordHandler: ChangePasswordCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      id: userIdVO(command.data.id),
      newPassword: userPasswordVO(command.data.newPassword),
      oldPassword: stringVO(command.data.oldPassword),
    }),
  );
