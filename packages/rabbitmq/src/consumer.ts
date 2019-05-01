import { Event, EventSubscriber } from '@oumi-package/shared/lib/core';

import { connect } from 'amqplib';

import { RabbitMQConfig } from './';

export abstract class RabbitMQConsumer implements EventSubscriber {
  constructor(protected readonly config: RabbitMQConfig) {
    this._constructor().then();
  }

  public clear(): void {
    // Nothing
  }

  public events<T>(): Event<T>[] {
    return [];
  }

  public abstract handle<T>(event: Event<T>): void;

  public abstract isSubscribedTo<T>(event: Event<T>): boolean;

  private async _constructor() {
    const connection = await Promise.resolve(connect(this.config.toString()));

    const channel = await Promise.resolve(connection.createChannel());

    await Promise.resolve(channel.assertQueue(this.config.queue()));

    await Promise.resolve(
      channel.consume(this.config.queue(), msg => {
        if (msg !== null) {
          const domainEvent: Event<any> = JSON.parse(msg.content.toString());

          this.handle(domainEvent);

          channel.ack(msg);
        }
      }),
    );
  }
}
