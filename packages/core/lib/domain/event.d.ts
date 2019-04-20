import { Message } from '.';
export interface Event<T> extends Message {
    readonly data: T;
    readonly occurredOn: Date;
}
export interface EventSubscriber {
    clear(): void;
    events<T>(): Event<T>[];
    handle<T>(event: Event<T>): void;
    isSubscribedTo<T>(event: Event<T>): boolean;
}
export interface EventPublisher {
    publish<T>(...events: Event<T>[]): Promise<void>;
}
export interface EventBus {
    notify<T>(event: Event<T>): Promise<void>;
}
export declare const event: <T>(data: T) => Event<T>;
export declare const publisher: (eventPublisher: EventPublisher) => <T>(...events: Event<T>[]) => Promise<void>;
export declare const notifier: (eventBus: EventBus) => <T>(event: Event<T>) => Promise<void>;
//# sourceMappingURL=event.d.ts.map