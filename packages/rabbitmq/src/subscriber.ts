import { Event, EventSubscriber } from '@oumi-package/shared/lib/core';

import { RabbitMQProducer } from './';

export class RabbitMQSubscriber implements EventSubscriber {
  private _events: Event<any>[] = [];

  constructor(protected readonly producer: RabbitMQProducer) {}

  public clear(): void {
    this._events = [];
  }

  public events<T>(): Event<T>[] {
    return this._events;
  }

  public async handle<T>(event: Event<T>) {
    this._events.push(event);

    // tslint:disable-next-line: no-console
    console.log('Evento recibido: ', event);
  }

  public isSubscribedTo<T>(event: Event<T>): boolean {
    return true;
  }
}
