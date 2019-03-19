import * as R from 'ramda';

import { message, Message, stringVO } from './';

// Types

export interface Command<T> extends Message {
  readonly data: T;
  readonly name: string;
  readonly occurredOn: Date;
}

export type CommandHandler<T extends Command<any>> = (
  command: T,
) => Promise<void>;

export interface CommandBus {
  dispatch<T>(command: Command<T>): Promise<void>;
}

// Helpers

export const command = <T>(data: T, name: string): Command<T> =>
  R.merge(message(), {
    data,
    name,
    occurredOn: new Date(),
    type: stringVO('command').value,
  });

export const dispatcher = (commandBus: CommandBus) => async <T>(
  // tslint:disable-next-line:no-shadowed-variable
  command: Command<T>,
) => {
  await commandBus.dispatch(command);
};
