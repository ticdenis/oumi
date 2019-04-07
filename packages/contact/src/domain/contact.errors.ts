import { DomainError } from '@oumi-package/core/lib';

export class ContactDomainError extends DomainError {
  public static notFound(key: string, value: any): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_NOT_FOUND',
      `The <${value}> contact ${key} not found`,
    );
  }

  public static invalidSource(source: any): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_INVALID_SOURCE',
      `The <${source}> source for contact is not valid`,
    );
  }

  public static requestAlreadyExists(
    requesterId: string,
    contactId: string,
  ): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_REQUEST_ALREADY_EXISTS',
      `The <${contactId}> contact id and ${requesterId} requester id already exists`,
    );
  }

  public constructor(readonly code: string, message: string) {
    super(code, message);
  }
}
