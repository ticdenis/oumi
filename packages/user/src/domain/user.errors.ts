import { DomainError } from '@oumi-package/core';

export class UserDomainError extends DomainError {
  public static alreadyExists(email: string): UserDomainError {
    return new UserDomainError(
      'USER_ALREADY_EXISTS',
      `The <${email}> user email already exists`,
    );
  }

  public static notFound(id: string): UserDomainError {
    return new UserDomainError(
      'USER_NOT_FOUND',
      `The <${id}> user id not found`,
    );
  }

  public static notExists(email: string): UserDomainError {
    return new UserDomainError(
      'USER_NOT_EXISTS',
      `The <${email}> user email not exists`,
    );
  }

  public static passwordNotMatch(password: string): UserDomainError {
    return new UserDomainError(
      'PASSWORD_NOT_MATCH',
      `The <${password}> password not match`,
    );
  }

  public constructor(readonly code: string, message: string) {
    super(code, message);
  }
}
