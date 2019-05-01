import { RabbitMQConfig } from '@oumi-package/rabbitmq';
import { Oumi } from '@oumi-package/shared/lib/core';

import { Environment, SERVICE_ID } from '..';
import { NewUserSubscriber } from '../../cases/new-user';

export function loadSubscribers(container: Oumi.Container) {
  const env = container.get<Environment>(SERVICE_ID.ENV);

  if (env.QUEUES_ENABLED === 'true') {
    const rabbitmqConfig = new RabbitMQConfig();

    // tslint:disable-next-line: no-unused-expression
    new NewUserSubscriber(rabbitmqConfig, container);
  }
}
