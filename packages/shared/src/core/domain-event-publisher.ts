import { Event, EventPublisher, EventSubscriber } from './';

export class DomainEventPublisher implements EventPublisher {
  public static instance(): DomainEventPublisher {
    if (null === DomainEventPublisher._instance) {
      DomainEventPublisher._instance = new this();
    }

    return DomainEventPublisher._instance;
  }

  private static _instance: DomainEventPublisher = null;
  private subscribers: Map<number, EventSubscriber>;
  private id: number;

  private constructor() {
    this.subscribers = new Map<number, EventSubscriber>();
    this.id = 0;
  }

  public clear(): void {
    this.subscribers.clear();

    this.id = 0;
  }

  public subscribe(subscriber: EventSubscriber): number {
    const id = this.id;
    this.subscribers.set(id, subscriber);
    this.id += 1;
    return this.id;
  }

  public ofId(id: number): EventSubscriber | null {
    return this.subscribers.get(id) || null;
  }
  public unsubscribe(id: number): void {
    this.subscribers.delete(id);
  }

  public publish<T>(...events: Event<T>[]): Promise<void> {
    [...this.subscribers.values()]
      .filter(subscriber =>
        events.filter(event => subscriber.isSubscribedTo(event)),
      )
      .forEach(subscriber => events.forEach(event => subscriber.handle(event)));

    return Promise.resolve();
  }
}
