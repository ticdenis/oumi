import { Event } from './event';

export interface EventSubscriber {
  events<T>(): Event<T>[];
  handle<T>(event: Event<T>): void;
  isSubscribedTo<T>(event: Event<T>): boolean;
}
