import { DomainError } from '@oumi-package/core';
import { Token } from '.';
export declare class TokenDomainError extends DomainError {
  readonly code: string;
  static invalidPayload(payload: any): TokenDomainError;
  static notValid(token: Token): TokenDomainError;
  static hasExpired(token: Token): TokenDomainError;
  constructor(code: string, message: string);
}
//# sourceMappingURL=token.errors.d.ts.map
