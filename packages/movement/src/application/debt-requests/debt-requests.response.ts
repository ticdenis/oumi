import { DataTransformer } from '@oumi-package/shared/lib/core';

import * as R from 'ramda';

import { Debt } from '../../domain';

export type DebtRequestsResponse = {
  amount: number;
  concept: string;
  currency: string;
  id: string;
  initialDate: Date;
  limitDate: Date;
  loanerId: string;
}[];

export const debtRequestsTransformer: DataTransformer<
  Debt[],
  DebtRequestsResponse
> = R.map(debt => ({
  amount: debt.amount.value.amount,
  concept: debt.concept.value,
  currency: debt.amount.value.currency.code,
  id: debt.id.value,
  initialDate: debt.initialDate.value,
  limitDate: debt.limitDate.value,
  loanerId: debt.loaner.id.value,
}));
