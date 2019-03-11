import { domainError } from '@oumi-package/shared';

export type UserAlreadyExistsError = (email: string) => Error;

export const userAlreadyExistsError: UserAlreadyExistsError = email =>
  domainError('user_already_exists', `The user <${email}> already exists`);
