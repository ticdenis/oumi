import { DomainError } from '@oumi-package/core';

export class UserDomainError extends DomainError {
  public constructor(readonly code: string, message: string) {
    super(code, message);
  }

  public static alreadyExists(email: string): UserDomainError {
    return new UserDomainError(
      'USER_ALREADY_EXISTS',
      `The user <${email}> already exists`,
    );
  }
}
