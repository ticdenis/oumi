import { Command, CommandHandler, Query, QueryHandler } from './';
export declare class DomainBus {
    static instance(): DomainBus;
    private static _instance;
    private _handlers;
    addHandler(commandOrQueryName: string, handler: CommandHandler<any> | QueryHandler<any, any>): void;
    run<T, R>(commandOrQuery: Command<T> | Query<T>): Promise<R | void>;
}
//# sourceMappingURL=domain-bus.d.ts.map