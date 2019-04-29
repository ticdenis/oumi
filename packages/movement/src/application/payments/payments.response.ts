import { DataTransformer } from '@oumi-package/shared/lib/core';

import * as R from 'ramda';

import { Payment } from '../../domain';

export type PaymentsResponse = {
  debt: {
    id: string;
    loanerId: string;
    quantity: number;
  };
  id: string;
  message: string | null;
  occurredOn: Date;
  quantity: number;
}[];

export const paymentsTransformer: DataTransformer<
  Payment[],
  PaymentsResponse
> = R.map(payment => ({
  debt: {
    id: payment.debt.id.value,
    loanerId: payment.debt.loanerId.value,
    quantity: payment.debt.quantity.value,
  },
  id: payment.id.value,
  message: payment.message.value,
  occurredOn: payment.occurredOn.value,
  quantity: payment.quantity.value,
}));
