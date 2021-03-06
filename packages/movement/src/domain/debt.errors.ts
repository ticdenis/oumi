import { DomainError } from '@oumi-package/shared/lib/core';

export class DebtDomainError extends DomainError {
  public static debtNotExists(id: string): DebtDomainError {
    return new DebtDomainError(
      'DEBT_NOT_EXISTS',
      `The <${id}> debt id not exists`,
    );
  }

  public static debtRequestAlreadyCompleted(id: string) {
    return new DebtDomainError(
      'DEBT_REQUEST_ALREADY_COMPLETED',
      `The <${id}> debt id request already completed`,
    );
  }

  public static debtRequestAlreadyConfirmed(id: string) {
    return new DebtDomainError(
      'DEBT_REQUEST_ALREADY_CONFIRMED',
      `The <${id}> debt id request already confirmed`,
    );
  }

  public static debtRequestAlreadyDenied(id: string) {
    return new DebtDomainError(
      'DEBT_REQUEST_ALREADY_DENIED',
      `The <${id}> debt id request already denied`,
    );
  }

  public static loanerNotFound(id: string): DebtDomainError {
    return new DebtDomainError(
      'LOANER_NOT_FOUND',
      `The <${id}> loaner id not found`,
    );
  }

  public static debtorNotFound(id: string): DebtDomainError {
    return new DebtDomainError(
      'DEBTOR_NOT_FOUND',
      `The <${id}> debtor id not found`,
    );
  }

  public static invalidSource(source: any): DebtDomainError {
    return new DebtDomainError(
      'DEBT_INVALID_SOURCE',
      `The <${source}> source for debt is not valid`,
    );
  }

  public constructor(readonly code: string, message: string) {
    super(code, message);
  }
}
