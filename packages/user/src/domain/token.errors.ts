import { DomainError } from '@oumi-package/core';

import { Token } from '.';

export class TokenDomainError extends DomainError {
  public static invalidPayload(payload: any): TokenDomainError {
    return new TokenDomainError(
      'TOKEN_INVALID_PAYLOAD',
      `The token payload <${JSON.stringify(payload)}> is invalid`,
    );
  }
  public static notValid(token: Token): TokenDomainError {
    return new TokenDomainError(
      'TOKEN_NOT_VALID',
      `The token <${token}> is not valid`,
    );
  }

  public static hasExpired(token: Token): TokenDomainError {
    return new TokenDomainError(
      'TOKEN_HAS_EXPIRED',
      `The token <${token}> has expired`,
    );
  }

  public constructor(readonly code: string, message: string) {
    super(code, message);
  }
}
