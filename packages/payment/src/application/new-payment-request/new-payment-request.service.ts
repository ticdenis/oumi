import { DomainError } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { Either, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import { PaymentId, PaymentMessage, PaymentQuantity } from '../../domain';

export type NewPaymentRequestService = (input: {
  debtId: DebtId;
  id: PaymentId;
  message: PaymentMessage;
  quantity: PaymentQuantity;
}) => Promise<Either<DomainError, void>>;

export type NewPaymentRequestBuilder = (options: {
  // TODO: [key: string]: any
}) => NewPaymentRequestService;

export const newPaymentRequestBuilderService: NewPaymentRequestBuilder = (
  {
    // TODO: keyof NewPaymentRequestBuilder['options']
  },
) => async input => {
  // TODO: To implement

  return right(constVoid());
};
