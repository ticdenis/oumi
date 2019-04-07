import {
  CommandHandler,
  eitherToPromise,
  nullableStringVO,
} from '@oumi-package/core/lib';
import {
  userIdVO,
  userNicknameVO,
} from '@oumi-package/shared/lib/domain/user.props';

import { ContactRequestCommand, ContactRequestService } from '.';

export type ContactRequestCommandHandler = (
  service: ContactRequestService,
) => CommandHandler<ContactRequestCommand>;

export const contactRequestHandler: ContactRequestCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      message: nullableStringVO(command.data.message),
      nickname: userNicknameVO(command.data.nickname),
      requesterId: userIdVO(command.data.requesterId),
    }),
  );
