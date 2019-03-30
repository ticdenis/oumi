import { Command } from '@oumi-package/core';
export interface UserRegistrationData {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  password: string;
  phone: string;
}
export declare class UserRegistrationCommand extends Command<
  UserRegistrationData
> {}
//# sourceMappingURL=user-registration.command.d.ts.map
