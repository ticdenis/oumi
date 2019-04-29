import { AggregateRoot } from '@oumi-package/shared/lib/core';

import {
  newPaymentRequested,
  PaymentDebt,
  PaymentDomainError,
  PaymentEvents,
  PaymentId,
  PaymentMessage,
  PaymentOcurredOn,
  PaymentQuantity,
} from './';

export interface PaymentConstructor {
  debt: PaymentDebt;
  id: PaymentId;
  message: PaymentMessage;
  occurredOn: PaymentOcurredOn;
  quantity: PaymentQuantity;
}

export class Payment extends AggregateRoot<PaymentEvents> {
  public static pay(args: PaymentConstructor): Payment {
    const ZERO = 0;

    if (args.debt.quantity.value === ZERO) {
      throw PaymentDomainError.debtInvalidQuantity(args.debt.quantity.value);
    } else if (
      args.quantity.value <= ZERO ||
      args.quantity.value > args.debt.quantity.value
    ) {
      throw PaymentDomainError.paymentInvalidQuantity(args.quantity.value);
    }

    const payment = new Payment(args);

    payment.recordDomainEvent(
      newPaymentRequested({
        debtId: payment._debt.id.value,
        id: payment._id.value,
        message: payment._message.value,
        quantity: payment._quantity.value,
      }),
    );

    return payment;
  }

  private _debt: PaymentDebt;
  private _id: PaymentId;
  private _message: PaymentMessage;
  private _occurredOn: PaymentOcurredOn;
  private _quantity: PaymentQuantity;

  public constructor(args: PaymentConstructor) {
    super();

    this._debt = args.debt;
    this._id = args.id;
    this._message = args.message;
    this._occurredOn = args.occurredOn;
    this._quantity = args.quantity;
  }

  get debt(): PaymentDebt {
    return this._debt;
  }

  get id(): PaymentId {
    return this._id;
  }

  get message(): PaymentMessage {
    return this._message;
  }

  get occurredOn(): PaymentOcurredOn {
    return this._occurredOn;
  }

  get quantity(): PaymentQuantity {
    return this._quantity;
  }
}
