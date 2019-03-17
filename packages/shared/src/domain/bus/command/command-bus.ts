import { Command } from './command';

export interface CommandBus {
  dispatch<T>(command: Command<T>): Promise<void>;
}

export const dispatcher = (commandBus: CommandBus) => async <T>(
  command: Command<T>,
) => {
  await commandBus.dispatch(command);
};
