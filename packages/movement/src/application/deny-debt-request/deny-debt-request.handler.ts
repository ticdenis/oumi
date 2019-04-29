import { CommandHandler, eitherToPromise } from '@oumi-package/shared/lib/core';
import { debtIdVO } from '@oumi-package/shared/lib/domain/debt.props';

import { DenyDebtRequestCommand, DenyDebtRequestService } from '.';

export type DenyDebtRequestCommandHandler = (
  service: DenyDebtRequestService,
) => CommandHandler<DenyDebtRequestCommand>;

export const denyDebtRequestHandler: DenyDebtRequestCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      id: debtIdVO(command.data.id),
    }),
  );
