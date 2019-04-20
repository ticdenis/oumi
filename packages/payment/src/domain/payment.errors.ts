import { DomainError } from '@oumi-package/shared/lib/core';

export class PaymentDomainError extends DomainError {
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
