import { Command } from './command';

export interface CommandBus {
  dispatch<T>(command: Command<T>): void;
}

export const dispatcher = (commandBus: CommandBus) => <T>(
  command: Command<T>,
) => commandBus.dispatch(command);
