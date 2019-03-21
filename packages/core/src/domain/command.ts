import { Message, stringVO, uuidVO } from './';

// Types

export type CommandHandler<T extends Command<any>> = (
  command: T,
) => Promise<void>;

export interface CommandBus {
  dispatch<T>(command: Command<T>): Promise<void>;
}

// Helpers

export abstract class Command<T> implements Message {
  public readonly data: T;
  public readonly id: string;
  public readonly name: string;
  public readonly occurredOn: Date;
  public readonly type: string;

  public constructor(data: T) {
    this.data = data;
    this.id = uuidVO().value;
    this.name = this.constructor.name;
    this.occurredOn = new Date();
    this.type = stringVO('command').value;
  }
}

export const dispatcher = (commandBus: CommandBus) => async <T>(
  command: Command<T>,
) => {
  await commandBus.dispatch(command);
};
