import { Event, EventSubscriber } from './';
export declare class DomainEventSubscriber implements EventSubscriber {
    static instance(): DomainEventSubscriber;
    private static _instance;
    protected _events: Map<string, Event<any>>;
    clear(): void;
    events<T>(): Event<T>[];
    handle<T>(event: Event<T>): void;
    isSubscribedTo<T>(_: Event<T>): boolean;
}
//# sourceMappingURL=domain-event-subscriber.d.ts.map