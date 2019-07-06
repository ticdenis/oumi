import { EuroCurrencyStub } from '@oumi-package/shared/lib/infrastructure/test/currency.stubs';
import { DebtIdStub } from '@oumi-package/shared/lib/infrastructure/test/debt.stubs';

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
  debtorIdVO,
  loanerIdVO,
} from '../../domain';

export const DebtAmountStub = debtAmountVO({
  amount: 100,
  currency: EuroCurrencyStub,
});

export const DebtConceptStub = debtConceptVO('concept');

export const DebtDebtorStub: DebtDebtor = {
  id: debtorIdVO('00000000-0000-0000-0000-000000000002'),
  status: DEBT_PENDING_STATUS,
};

export const DebtInitialDateStub = debtInitialDateVO();

export const DebtLimitDateStub = debtInitialDateVO();

export const DebtLoanerStub: DebtLoaner = {
  id: loanerIdVO('00000000-0000-0000-0000-000000000001'),
  status: DEBT_SENDED_STATUS,
};

export const generateDebtorStub = (args: Partial<DebtDebtor>) => ({
  id: args.id || DebtDebtorStub.id,
  status: args.status || DebtDebtorStub.status,
});

export const generateLoanerStub = (args: Partial<DebtLoaner>) => ({
  id: args.id || DebtLoanerStub.id,
  status: args.status || DebtLoanerStub.status,
});

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
