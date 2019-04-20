import { Event, EventPublisher, EventSubscriber } from '../domain';
export declare class DomainEventPublisher implements EventPublisher {
    static instance(): DomainEventPublisher;
    private static _instance;
    private subscribers;
    private id;
    private constructor();
    subscribe(subscriber: EventSubscriber): number;
    ofId(id: number): EventSubscriber | null;
    unsubscribe(id: number): void;
    publish<T>(...events: Event<T>[]): Promise<void>;
}
//# sourceMappingURL=domain-event-publisher.d.ts.map