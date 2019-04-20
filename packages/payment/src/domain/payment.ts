import { AggregateRoot } from '@oumi-package/shared/lib/core';

import {
  PaymentDebt,
  PaymentEvents,
  PaymentId,
  PaymentMessage,
  PaymentOcurredOn,
  PaymentQuantity,
} from '.';

export interface PaymentConstructor {
  debt: PaymentDebt;
  id: PaymentId;
  message: PaymentMessage;
  occurredOn: PaymentOcurredOn;
  quantity: PaymentQuantity;
}

export class Payment extends AggregateRoot<PaymentEvents> {}
