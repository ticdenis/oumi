import { Event } from './event';

export interface EventPublisher {
  publish<T>(...events: Event<T>[]): Promise<void>;
}

export const publisher = (eventPublisher: EventPublisher) => async <T>(
  ...events: Event<T>[]
) => {
  await eventPublisher.publish(...events);
};
