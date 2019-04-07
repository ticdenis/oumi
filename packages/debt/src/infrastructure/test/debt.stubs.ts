import { EuroCurrencyStub } from '@oumi-package/shared/lib/infrastructure/test/currency.stubs';
import { DebtIdStub } from '@oumi-package/shared/lib/infrastructure/test/debt.stubs';
import { userIdVO } from '@oumi-package/user/lib';

import {
  Debt,
  DEBT_PENDING_STATUS,
  DEBT_SENDED_STATUS,
  debtAmountVO,
  debtConceptVO,
  DebtConstructor,
  DebtDebtor,
  debtInitialDateVO,
  DebtLoaner,
} from '../../domain';

// tslint:disable-next-line: variable-name
export const DebtAmountStub = debtAmountVO({
  amount: 100,
  currency: EuroCurrencyStub,
});

// tslint:disable-next-line: variable-name
export const DebtConceptStub = debtConceptVO('concept');

// tslint:disable-next-line: variable-name
export const DebtDebtorStub: DebtDebtor = {
  id: userIdVO('00000000-0000-0000-0000-000000000002'),
  status: DEBT_PENDING_STATUS,
};

// tslint:disable-next-line: variable-name
export const DebtInitialDateStub = debtInitialDateVO();

// tslint:disable-next-line: variable-name
export const DebtLimitDateStub = debtInitialDateVO();

// tslint:disable-next-line: variable-name
export const DebtLoanerStub: DebtLoaner = {
  id: userIdVO('00000000-0000-0000-0000-000000000001'),
  status: DEBT_SENDED_STATUS,
};

// tslint:disable-next-line: variable-name
export const DebtStub = new Debt({
  amount: DebtAmountStub,
  concept: DebtConceptStub,
  debtor: DebtDebtorStub,
  id: DebtIdStub,
  initialDate: DebtInitialDateStub,
  limitDate: DebtLimitDateStub,
  loaner: DebtLoanerStub,
});

export const generateDebtStub = (args: Partial<DebtConstructor> = {}) =>
  new Debt({
    amount: args.amount || DebtAmountStub,
    concept: args.concept || DebtConceptStub,
    debtor: args.debtor || DebtDebtorStub,
    id: args.id || DebtIdStub,
    initialDate:
      null === args.initialDate ? args.initialDate : DebtInitialDateStub,
    limitDate: null === args.limitDate ? args.limitDate : DebtLimitDateStub,
    loaner: args.loaner || DebtLoanerStub,
  });
