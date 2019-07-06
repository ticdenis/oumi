import { Event, EventSubscriber } from './';

export class DomainEventSubscriber implements EventSubscriber {
  protected _events = new Map<string, Event<any>>();

  public clear(): void {
    this._events.clear();
  }

  public events<T>(): Event<T>[] {
    return Array.from(this._events.values());
  }

  public handle<T>(event: Event<T>): void {
    this._events.set(event.id, event);
  }

  public isSubscribedTo<T>(_: Event<T>): boolean {
    return true;
  }
}
