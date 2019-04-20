import { Command, Oumi, Query } from '@oumi-package/shared/lib/core';
export declare const runDomainEventsJob: (container: Oumi.Container) => Promise<[void, void]>;
export declare type Resolver<A = any, T = any> = (parent: any, args: A, context: {
    container: Oumi.Container;
}) => T | Promise<T>;
export declare const mutationResolver: <Data>(CommandClass: new (data: Data) => Command<Data>) => Resolver<{
    input: Data;
}, void>;
export declare const queryResolver: <Data, Response_1>(QueryClass: new (data: Data) => Query<Data>) => Resolver<{
    input: Data;
}, Response_1>;
//# sourceMappingURL=graphql.d.ts.map