import { CommandHandler, eitherToPromise } from '@oumi-package/shared/lib/core';
import { debtIdVO } from '@oumi-package/shared/lib/domain/debt.props';

import { EndDebtCommand, EndDebtService } from '.';

export type EndDebtCommandHandler = (
  service: EndDebtService,
) => CommandHandler<EndDebtCommand>;

export const endDebtHandler: EndDebtCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      id: debtIdVO(command.data.id),
    }),
  );
