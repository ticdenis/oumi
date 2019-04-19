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

export const event = <T>(data: T): Event<T> =>
  R.merge(message(), {
    data,
    occurredOn: new Date(),
    type: stringVO('event').value,
  });

export const publisher = (eventPublisher: EventPublisher) => async <T>(
  ...events: Event<T>[]
) => {
  await eventPublisher.publish(...events);
};

// tslint:disable-next-line:no-shadowed-variable
export const notifier = (eventBus: EventBus) => async <T>(event: Event<T>) => {
  await eventBus.notify(event);
};
