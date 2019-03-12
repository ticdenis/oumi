import { Event } from './event';

export interface EventPublisher {
  publish<T>(...events: Event<T>[]): void;
}

export const publisher = (eventPublisher: EventPublisher) => <T>(
  ...events: Event<T>[]
) => eventPublisher.publish(...events);
