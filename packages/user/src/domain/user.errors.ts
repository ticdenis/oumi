import { DomainError, domainError, ReturnType } from '@oumi-package/shared';

export type UserAlreadyExistsError = (email: string) => ReturnType<DomainError>;

export const userAlreadyExistsError: UserAlreadyExistsError = email =>
  domainError('user_already_exists', `The user <${email}> already exists`);
