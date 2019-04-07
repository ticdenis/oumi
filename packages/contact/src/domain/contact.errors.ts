import { DomainError } from '@oumi-package/core/lib';

export class ContactDomainError extends DomainError {
  public static notFound(id: string): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_NOT_FOUND',
      `The <${id}> contact id not found`,
    );
  }

  public static invalidSource(source: any): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_INVALID_SOURCE',
      `The <${source}> source for contact is not valid`,
    );
  }

  public constructor(readonly code: string, message: string) {
    super(code, message);
  }
}
