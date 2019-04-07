import { stringVO } from '@oumi-package/core/lib';
import { debtIdVO } from '@oumi-package/shared/lib/domain/debt.props';
import { userIdVO } from '@oumi-package/shared/lib/domain/user.props';

import * as R from 'ramda';

import {
  Debt,
  debtAmountVO,
  debtConceptVO,
  DebtDomainError,
  debtInitialDateVO,
  DebtMapper,
  DebtStatus,
} from '../domain';

const item = R.ifElse(
  R.has('id'),
  source =>
    new Debt({
      amount: debtAmountVO(source.amount),
      concept: debtConceptVO(source.concept),
      debtor: {
        id: userIdVO(source.debtor ? source.debtor.id : source.debtorId),
        status: stringVO(
          source.debtor ? source.debtor.status : source.debtorStatus,
        ).value.toUpperCase() as DebtStatus,
      },
      id: debtIdVO(source.id),
      initialDate: debtInitialDateVO(source.initialDate),
      limitDate: debtInitialDateVO(source.limitDate),
      loaner: {
        id: userIdVO(source.loaner ? source.loaner.id : source.loanerId),
        status: stringVO(
          source.loaner ? source.loaner.status : source.loanerStatus,
        ).value.toUpperCase() as DebtStatus,
      },
    }),
  source => {
    throw DebtDomainError.invalidSource(source);
  },
);

export const jsonDebtMapper: DebtMapper<object> = {
  item,
  items: R.map(item),
};
