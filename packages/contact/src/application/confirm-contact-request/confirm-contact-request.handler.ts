import { CommandHandler, eitherToPromise } from '@oumi-package/core/lib';

import { contactIdVO } from '../../domain';

import { ConfirmContactRequestCommand, ConfirmContactRequestService } from '.';

export type ConfirmContactRequestCommandHandler = (
  service: ConfirmContactRequestService,
) => CommandHandler<ConfirmContactRequestCommand>;

export const confirmContactRequestHandler: ConfirmContactRequestCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      contactId: contactIdVO(command.data.contactId),
      contactRequestId: contactIdVO(command.data.contactRequestId),
    }),
  );
