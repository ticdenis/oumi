import { Command, command } from '@oumi-package/shared';

export interface UserRegistrationInput {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  password: string;
  phone: string;
}

// tslint:disable-next-line:variable-name
export const UserRegistrationCommandName = 'UserRegistrationCommand';

export type UserRegistrationCommand = Command<UserRegistrationInput>;

export const userRegistrationCommand = (
  input: UserRegistrationInput,
): UserRegistrationCommand => command(input, UserRegistrationCommandName);
