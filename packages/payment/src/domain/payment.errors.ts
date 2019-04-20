import { DomainError } from '@oumi-package/shared/lib/core';

export class PaymentDomainError extends DomainError {
  public static debtInvalidQuantity(quantity: number): PaymentDomainError {
    return new PaymentDomainError(
      'PAYMENT_DEBT_QUANTITY_INVALID',
      `The <${quantity}> payment debt quantity is invalid`,
    );
  }

  public static paymentInvalidQuantity(quantity: number): PaymentDomainError {
    return new PaymentDomainError(
      'PAYMENT_QUANTITY_INVALID',
      `The <${quantity}> payment quantity is invalid`,
    );
  }

  public static debtNotFound(id: string): PaymentDomainError {
    return new PaymentDomainError(
      'PAYMENT_DEBT_NOT_FOUND',
      `The <${id}> payment debt id not found`,
    );
  }

  public static invalidSource(source: any): PaymentDomainError {
    return new PaymentDomainError(
      'PAYMENT_INVALID_SOURCE',
      `The <${source}> source for payment is not valid`,
    );
  }

  public constructor(readonly code: string, message: string) {
    super(code, message);
  }
}
