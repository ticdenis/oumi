import { Message } from './';
export declare type QueryHandler<T extends Query<any>, Q> = (query: T) => Promise<Q>;
export interface QueryBus {
    ask<T, Q>(query: Query<T>): Promise<Q>;
}
export declare abstract class Query<T> implements Message {
    readonly data: T;
    readonly id: string;
    readonly name: string;
    readonly occurredOn: Date;
    readonly type: string;
    constructor(data: T);
}
export declare const asker: (queryBus: QueryBus) => <T, Q>(query: Query<T>) => Promise<void>;
//# sourceMappingURL=query.d.ts.map