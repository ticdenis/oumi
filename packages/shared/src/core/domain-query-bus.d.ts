import { Query, QueryBus, QueryHandler } from './';
export declare class DomainQueryBus implements QueryBus {
    static instance(): DomainQueryBus;
    private static _instance;
    private _queryHandlers;
    addHandler(queryName: string, queryHandler: QueryHandler<any, any>): void;
    ask<T, R>(query: Query<T>): Promise<R>;
}
//# sourceMappingURL=domain-query-bus.d.ts.map