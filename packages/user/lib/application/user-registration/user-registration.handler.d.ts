import { CommandHandler } from '@oumi-package/core';
import { UserRegistrationCommand } from './user-registration.command';
import { UserRegistrationService } from './user-registration.service';
export declare type UserRegistrationCommandHandler = (
  service: UserRegistrationService,
) => CommandHandler<UserRegistrationCommand>;
export declare const userRegistrationHandler: UserRegistrationCommandHandler;
//# sourceMappingURL=user-registration.handler.d.ts.map
