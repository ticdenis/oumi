import { Event } from '.';

export abstract class AggregateRoot<DomainEventType> {
  private _domainEvents: Event<DomainEventType>[] = [];

  public pullDomainEvents(): Event<DomainEventType>[] {
    const domainEvents = [...this._domainEvents];

    this._domainEvents = [];

    return domainEvents;
  }

  protected recordDomainEvent(domainEvent: Event<DomainEventType>): void {
    this._domainEvents.push(domainEvent);
  }
}
