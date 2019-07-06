import { CommandHandler, eitherToPromise } from '@oumi-package/shared/lib/core';
import { currencyFromCodeVO } from '@oumi-package/shared/lib/domain/currency.props';
import { debtIdVO } from '@oumi-package/shared/lib/domain/debt.props';
import { userIdVO } from '@oumi-package/shared/lib/domain/user.props';

import { debtAmountVO, debtConceptVO, debtIntervalDateVO } from '../../domain';

import { NewDebtRequestCommand, NewDebtRequestService } from '.';

export type NewDebtRequestCommandHandler = (
  service: NewDebtRequestService,
) => CommandHandler<NewDebtRequestCommand>;

export const newDebtRequestHandler: NewDebtRequestCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      amount: debtAmountVO({
        amount: command.data.amount,
        currency: currencyFromCodeVO(command.data.currency),
      }),
      concept: debtConceptVO(command.data.concept),
      debtorId: userIdVO(command.data.debtorId),
      id: debtIdVO(command.data.id),
      intervalDate: debtIntervalDateVO({
        end: command.data.limitDate || new Date(),
        start: command.data.initialDate || new Date(),
      }),
      loanerId: userIdVO(command.data.loanerId),
    }),
  );
