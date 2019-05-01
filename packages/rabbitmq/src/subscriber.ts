import { Event, EventSubscriber } from '@oumi-package/shared/lib/core';

import { RabbitMQConfig, RabbitMQProducer } from '.';

export class RabbitMQEventSubscriber implements EventSubscriber {
  private readonly _publisher: RabbitMQProducer;

  public constructor(config: RabbitMQConfig) {
    this._publisher = new RabbitMQProducer(config);
  }

  public clear(): void {
    // Nothing
  }

  public events<T>(): Event<T>[] {
    return [];
  }

  public handle<T>(event: Event<T>): void {
    this._publisher.publish(event).then();
  }

  public isSubscribedTo<T>(event: Event<T>): boolean {
    return true;
  }
}
