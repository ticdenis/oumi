import {
  Command,
  CommandBus,
  CommandDomainError,
  CommandHandler,
} from '../domain';

export class DomainCommandBus implements CommandBus {
  public static instance(): DomainCommandBus {
    if (DomainCommandBus._instance === null) {
      DomainCommandBus._instance = new this();
    }

    return DomainCommandBus._instance;
  }

  private static _instance: DomainCommandBus = null;
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
