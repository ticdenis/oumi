import {
  Event,
  EventPublisher,
  EventSubscriber,
} from '@oumi-package/shared/lib/core';

import { Channel, connect, Connection } from 'amqplib';

import { RabbitMQConfig } from './';

export class RabbitMQProducer implements EventPublisher {
  private connection: Connection;
  private channel: Channel;
  private subscribers: Map<number, EventSubscriber> = new Map();
  private id: number = 0;

  constructor(private readonly config: RabbitMQConfig) {}

  public clear(): void {
    this.subscribers.clear();

    this.id = 0;
  }

  public subscribe(subscriber: EventSubscriber): number {
    const id = this.id;
    this.subscribers.set(id, subscriber);
    this.id += 1;
    return this.id;
  }

  public ofId(id: number): EventSubscriber | null {
    return this.subscribers.get(id) || null;
  }

  public unsubscribe(id: number): void {
    this.subscribers.delete(id);
  }

  public async publish<T>(...events: Event<T>[]) {
    this.connection = await Promise.resolve(connect(this.config.toString()));

    this.channel = await Promise.resolve(this.connection.createChannel());

    await Promise.resolve(this.channel.assertQueue(this.config.queue()));

    for (const event of events) {
      await Promise.resolve(
        this.channel.sendToQueue(
          this.config.queue(),
          Buffer.from(JSON.stringify(event)),
        ),
      );
    }

    await Promise.resolve(this.channel.close());

    await Promise.resolve(this.connection.close());
  }
}
