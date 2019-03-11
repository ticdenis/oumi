import { Command, command } from '@oumi-package/shared';

export interface UserRegistrationInput {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  password: string;
}

export type UserRegistrationCommand = Command<UserRegistrationInput>;

export const userRegistrationCommand = (
  input: UserRegistrationInput,
): UserRegistrationCommand => command(input);
