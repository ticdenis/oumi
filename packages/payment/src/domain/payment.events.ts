import { event } from '@oumi-package/shared/lib/core';

export type PaymentEvents = NewPaymentRequested;

export interface NewPaymentRequested {
  debtId: string;
  message: string | null;
  quantity: number;
}

export const newPaymentRequested = (data: NewPaymentRequested) => event(data);
