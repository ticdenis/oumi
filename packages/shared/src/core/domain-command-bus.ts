import { EventEmitter } from 'events';

import { Command, CommandBus, CommandDomainError, CommandHandler } from './';

export class DomainCommandBus implements CommandBus {
  private _commandHandlers: Map<string, CommandHandler<any>> = new Map();

  public addHandler(
    commandName: string,
    commandHandler: CommandHandler<any>,
  ): void {
    this._commandHandlers.set(commandName, commandHandler);
  }

  public async dispatch<T>(command: Command<T>): Promise<void> {
    if ('command' !== command.type) {
      return Promise.reject(
        new CommandDomainError(
          'INVALID_COMMAND_TYPE',
          `Argument received not is a command is a <${command.type}>.`,
        ),
      );
    }

    if (!this._commandHandlers.has(command.name)) {
      return Promise.reject(
        new CommandDomainError(
          'COMMAND_NOT_FOUND',
          `Command Handler for <${command.name}> not found.`,
        ),
      );
    }

    await this._commandHandlers.get(command.name)(command);
  }
}

export class DomainAsyncCommandBus implements CommandBus {
  private _emitter = new EventEmitter();
  private _commandHandlers: Map<string, CommandHandler<any>> = new Map();

  public addHandler(
    commandName: string,
    commandHandler: CommandHandler<any>,
  ): void {
    this._commandHandlers.set(commandName, commandHandler);

    this._emitter.on(commandName, async (command: Command<any>) => {
      await this._commandHandlers.get(command.name)(command);
    });
  }

  public async dispatch<T>(command: Command<T>): Promise<void> {
    if ('command' !== command.type) {
      return Promise.reject(
        new CommandDomainError(
          'INVALID_COMMAND_TYPE',
          `Argument received not is a command is a <${command.type}>.`,
        ),
      );
    }

    if (!this._commandHandlers.has(command.name)) {
      return Promise.reject(
        new CommandDomainError(
          'COMMAND_NOT_FOUND',
          `Command Handler for <${command.name}> not found.`,
        ),
      );
    }

    this._emitter.emit(command.name, command);
  }
}
