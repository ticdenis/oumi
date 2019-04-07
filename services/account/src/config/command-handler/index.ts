import { CommandHandler, Oumi } from '@oumi-package/core/lib';

import changePasswordHandler from './change-password.handler';
import updateProfileHandler from './update-profile.handler';
import userRegistrationHandler from './user-registration.handler';

export type MakeCommandHandler = (
  container: Oumi.Container,
) => [string, CommandHandler<any>];

export type CommandHandlers = (
  container: Oumi.Container,
) => [string, CommandHandler<any>][];

export const COMMAND_HANDLERS: CommandHandlers = container => [
  changePasswordHandler(container),
  userRegistrationHandler(container),
  updateProfileHandler(container),
];
