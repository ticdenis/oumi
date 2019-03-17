import {
  Command,
  CommandBus,
  CommandHandler,
  domainError,
} from '../../../domain';

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
        domainError(
          'dispatch_invalid_command',
          `Argument received not is a command is a <${command.type}>.`,
        ),
      );
    }

    if (!this._commandHandlers.has(command.name)) {
      return Promise.reject(
        domainError(
          'command_not_found',
          `Command Handler for <${command.name}> not found.`,
        ),
      );
    }

    await this._commandHandlers.get(command.name)(command);
  }
}
