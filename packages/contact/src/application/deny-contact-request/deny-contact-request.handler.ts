import { CommandHandler, eitherToPromise } from '@oumi-package/core/lib';

import { contactIdVO } from '../../domain';

import { DenyContactRequestCommand, DenyContactRequestService } from '.';

export type DenyContactRequestCommandHandler = (
  service: DenyContactRequestService,
) => CommandHandler<DenyContactRequestCommand>;

export const denyContactRequestHandler: DenyContactRequestCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      contactId: contactIdVO(command.data.contactId),
      contactRequestId: contactIdVO(command.data.contactRequestId),
    }),
  );
