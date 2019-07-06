import { DomainError } from '@oumi-package/shared/lib/core';

export class ContactDomainError extends DomainError {
  public static canNotSendRequestYourself(id: string) {
    return new ContactDomainError(
      'CONTACT_NOT_SEND_REQUEST_YOURSELF',
      `The <${id}> contact id not sended request himself`,
    );
  }
  public static notFound(key: string, value: any): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_NOT_FOUND',
      `The <${value}> contact ${key} not found`,
    );
  }

  public static invalidSource(source: any): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_INVALID_SOURCE',
      `The <${JSON.stringify(source)}> source for contact is not valid`,
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

  public static requestAlreadyConfirmed(
    requesterId: string,
    contactId: string,
  ): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_REQUEST_ALREADY_CONFIRMED',
      `The <${contactId}> contact id and ${requesterId} requester id already exists`,
    );
  }

  public static requestAlreadyDenied(
    requesterId: string,
    contactId: string,
  ): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_REQUEST_ALREADY_DENIED',
      `The <${contactId}> contact id and ${requesterId} requester id already exists`,
    );
  }

  public static requestNotFound(requesterId: string): ContactDomainError {
    return new ContactDomainError(
      'CONTACT_REQUEST_NOT_FOUND',
      `The <${requesterId}> contact request id not found`,
    );
  }

  public constructor(readonly code: string, message: string) {
    super(code, message);
  }
}
