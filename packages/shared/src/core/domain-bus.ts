import {
  Command,
  CommandHandler,
  DomainCommandBus,
  Query,
  QueryHandler,
} from './';
import { DomainQueryBus } from './domain-query-bus';

export class DomainBus {
  public static instance(): DomainBus {
    if (null === DomainBus._instance) {
      DomainBus._instance = new this();
    }

    return DomainBus._instance;
  }

  private static _instance: DomainBus = null;
  private _handlers: Map<
    string,
    CommandHandler<any> | QueryHandler<any, any>
  > = new Map();

  public addHandler(
    commandOrQueryName: string,
    handler: CommandHandler<any> | QueryHandler<any, any>,
  ): void {
    this._handlers.set(commandOrQueryName, handler);
  }

  public async run<T, R>(
    commandOrQuery: Command<T> | Query<T>,
  ): Promise<R | void> {
    if (commandOrQuery instanceof Command) {
      const bus = DomainCommandBus.instance();

      bus.addHandler(
        commandOrQuery.name,
        this._handlers.get(commandOrQuery.name),
      );

      return bus.dispatch(commandOrQuery);
    }

    if (commandOrQuery instanceof Query) {
      const bus = DomainQueryBus.instance();

      bus.addHandler(
        commandOrQuery.name,
        this._handlers.get(commandOrQuery.name),
      );

      return bus.ask(commandOrQuery);
    }
  }
}
