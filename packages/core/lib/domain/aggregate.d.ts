import { Event } from '.';
export declare abstract class AggregateRoot<DomainEventType> {
    private _domainEvents;
    pullDomainEvents(): Event<DomainEventType>[];
    protected recordDomainEvent(domainEvent: Event<DomainEventType>): void;
}
export declare abstract class Aggregate {
}
//# sourceMappingURL=aggregate.d.ts.map