import { Event } from './event';

export interface EventBus {
  notify<T>(event: Event<T>): void;
}

export const notifier = (eventBus: EventBus) => <T>(event: Event<T>) =>
  eventBus.notify(event);
