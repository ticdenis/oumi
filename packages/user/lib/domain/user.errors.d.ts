import { DomainError } from '@oumi-package/core';
export declare class UserDomainError extends DomainError {
  readonly code: string;
  static alreadyExists(email: string): UserDomainError;
  static notFound(id: string): UserDomainError;
  static notExists(email: string): UserDomainError;
  constructor(code: string, message: string);
}
//# sourceMappingURL=user.errors.d.ts.map
