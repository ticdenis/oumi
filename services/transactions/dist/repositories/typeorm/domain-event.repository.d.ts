import { Event, EventPublisher, Oumi } from '@oumi-package/shared/lib/core';
export declare class TypeORMDomainEventRepository implements EventPublisher {
    private readonly _connection;
    constructor(container: Oumi.Container);
    publish<T>(...events: Event<T>[]): Promise<void>;
}
//# sourceMappingURL=domain-event.repository.d.ts.map