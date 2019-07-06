import * as R from 'ramda';

import { message, Message, stringVO } from './';

// Types

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

// Helpers

export const eventType = (
  service: string,
  version: number,
  entity: string,
  eventName: string,
) => `oumi.${service}.${version}.event.${entity}.${eventName}`;

export const event = (type: string) => <T>(data: T): Event<T> =>
  R.merge(message(), {
    data,
    occurredOn: new Date(),
    type,
  });

export const publisher = (eventPublisher: EventPublisher) => async <T>(
  ...events: Event<T>[]
) => {
  await eventPublisher.publish(...events);
};

export const notifier = (eventBus: EventBus) => async <T>(e: Event<T>) => {
  await eventBus.notify(e);
};
