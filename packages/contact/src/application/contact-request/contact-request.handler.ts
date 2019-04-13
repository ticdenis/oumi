import {
  CommandHandler,
  eitherToPromise,
  nullableStringVO,
} from '@oumi-package/core/lib';

import { contactIdVO, contactNicknameVO } from '../../domain';

import { ContactRequestCommand, ContactRequestService } from '.';

export type ContactRequestCommandHandler = (
  service: ContactRequestService,
) => CommandHandler<ContactRequestCommand>;

export const contactRequestHandler: ContactRequestCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      message: nullableStringVO(command.data.message),
      nickname: contactNicknameVO(command.data.nickname),
      requesterId: contactIdVO(command.data.requesterId),
    }),
  );
