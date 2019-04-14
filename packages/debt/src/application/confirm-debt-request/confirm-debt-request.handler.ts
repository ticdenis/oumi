import { CommandHandler, eitherToPromise } from '@oumi-package/core/lib';
import { debtIdVO } from '@oumi-package/shared/lib/domain/debt.props';

import { ConfirmDebtRequestCommand, ConfirmDebtRequestService } from '.';

export type ConfirmDebtRequestCommandHandler = (
  service: ConfirmDebtRequestService,
) => CommandHandler<ConfirmDebtRequestCommand>;

export const confirmDebtRequestHandler: ConfirmDebtRequestCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      id: debtIdVO(command.data.id),
    }),
  );
