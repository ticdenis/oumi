import { Event, EventPublisher } from '@oumi-package/shared/lib/core';

import { Channel, connect, Connection } from 'amqplib';

import { RabbitMQConfig } from './';

export class RabbitMQProducer implements EventPublisher {
  private connection: Connection;
  private channel: Channel;

  constructor(private readonly config: RabbitMQConfig) {}

  public async publish<T>(...events: Event<T>[]) {
    this.connection = await Promise.resolve(connect(this.config.toString()));

    this.channel = await Promise.resolve(this.connection.createChannel());

    await Promise.resolve(this.channel.assertQueue(this.config.queue()));

    for (const event of events) {
      this.channel.sendToQueue(
        this.config.queue(),
        Buffer.from(JSON.stringify(event)),
      );
    }

    await Promise.resolve(this.channel.close());

    await Promise.resolve(this.connection.close());
  }
}
