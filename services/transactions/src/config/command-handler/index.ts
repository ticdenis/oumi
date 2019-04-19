import { CommandHandler, Oumi } from '@oumi-package/shared/lib/core';

export type MakeCommandHandler = (
  container: Oumi.Container,
) => [string, CommandHandler<any>];

export type CommandHandlers = (
  container: Oumi.Container,
) => [string, CommandHandler<any>][];

export const COMMAND_HANDLERS: CommandHandlers = container => [
  // ?(container),
];
