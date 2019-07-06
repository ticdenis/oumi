import { RabbitMQConfig, RabbitMQConsumer } from '@oumi-package/rabbitmq/lib';
import { Event, eventType, Oumi } from '@oumi-package/shared/lib/core';

import { newUserTask } from './';

export class NewUserSubscriber extends RabbitMQConsumer {
  public constructor(
    config: RabbitMQConfig,
    private readonly container: Oumi.Container,
  ) {
    super(config);
  }

  public handle<T>(event: Event<T>): void {
    if (this.isSubscribedTo(event)) {
      newUserTask(this.container)(event as any).then();
    }
  }

  public isSubscribedTo<T>(event: Event<T>): boolean {
    return event.type === eventType('user', 1, 'user', 'user-registered');
  }
}
