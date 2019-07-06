import { Event, EventPublisher, EventSubscriber } from './';

export class DomainEventPublisher implements EventPublisher {
  private subscribers: Map<number, EventSubscriber> = new Map();
  private id: number = 0;

  public clear(): void {
    this.subscribers.clear();

    this.id = 0;
  }

  public subscribe(subscriber: EventSubscriber): number {
    const id = this.id;
    this.subscribers.set(id, subscriber);
    this.id += 1;
    return id;
  }

  public ofId(id: number): EventSubscriber | null {
    return this.subscribers.get(id) || null;
  }

  public unsubscribe(id: number): void {
    this.subscribers.delete(id);
  }

  public publish<T>(...events: Event<T>[]): Promise<void> {
    const subscribers = [...this.subscribers.values()];

    for (const event of events) {
      for (const subscriber of subscribers) {
        if (subscriber.isSubscribedTo(event)) {
          subscriber.handle(event);
        }
      }
    }

    return Promise.resolve();
  }
}
