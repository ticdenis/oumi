import { DomainError } from '@oumi-package/core';

export class ContactDomainError extends DomainError {
  public static notFound(id: string): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_NOT_FOUND',
      `The <${id}> contact id not found`,
    );
  }

  public constructor(readonly code: string, message: string) {
    super(code, message);
  }
}
