import { Command } from '@oumi-package/shared/lib/core';

export interface UserRegistrationData {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  password: string;
  phone: string;
}

export class UserRegistrationCommand extends Command<UserRegistrationData> {}
