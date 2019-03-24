import { CommandHandler, Oumi } from '@oumi-package/core/lib';

import userRegistrationHandler from './user-registration.handler';

export type MakeCommandHandler = (
  container: Oumi.Container,
) => [string, CommandHandler<any>];

export type CommandHandlers = (
  container: Oumi.Container,
) => [string, CommandHandler<any>][];

export const COMMAND_HANDLERS: CommandHandlers = container => [
  userRegistrationHandler(container),
];
