import {
  RabbitMQConfig,
  RabbitMQEventSubscriber,
} from '@oumi-package/rabbitmq/lib';
import {
  CommandBus,
  DomainAsyncCommandBus,
  DomainCommandBus,
  DomainEventPublisher,
  DomainEventSubscriber,
  DomainQueryBus,
  EventPublisher,
  EventSubscriber,
  Oumi,
  QueryBus,
} from '@oumi-package/shared/lib/core';

import { Environment, SERVICE_ID } from '..';
import {
  CONFIRM_DEBT_REQUEST_COMMAND,
  CONFIRM_DEBT_REQUEST_COMMAND_HANDLER,
} from '../../cases/confirm-debt-request';
import {
  DEBT_REQUESTS_QUERY,
  DEBT_REQUESTS_QUERY_HANDLER,
} from '../../cases/debt-requests';
import {
  DENY_DEBT_REQUEST_COMMAND,
  DENY_DEBT_REQUEST_COMMAND_HANDLER,
} from '../../cases/deny-debt-request';
import {
  END_DEBT_COMMAND,
  END_DEBT_COMMAND_HANDLER,
} from '../../cases/end-debt';
import {
  MOVEMENTS_QUERY,
  MOVEMENTS_QUERY_HANDLER,
} from '../../cases/movements';
import {
  NEW_DEBT_REQUEST_COMMAND,
  NEW_DEBT_REQUEST_COMMAND_HANDLER,
} from '../../cases/new-debt-request';
import { NEW_PAY_COMMAND, NEW_PAY_COMMAND_HANDLER } from '../../cases/new-pay';
import { PAYMENTS_QUERY, PAYMENTS_QUERY_HANDLER } from '../../cases/payments';

export function loadBuses(container: Oumi.Container) {
  const env = container.get<Environment>(SERVICE_ID.ENV);

  container.setAsync<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER, () => {
    return new DomainEventSubscriber();
  });

  container.setAsync<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER, () => {
    const publisher = new DomainEventPublisher();

    publisher.subscribe(
      container.get<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER),
    );

    if (env.QUEUES_ENABLED === 'true') {
      publisher.subscribe(new RabbitMQEventSubscriber(new RabbitMQConfig()));
    }

    return publisher;
  });

  container.setAsync<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, () => {
    const bus = new DomainQueryBus();

    bus.addHandler(DEBT_REQUESTS_QUERY, DEBT_REQUESTS_QUERY_HANDLER(container));

    bus.addHandler(PAYMENTS_QUERY, PAYMENTS_QUERY_HANDLER(container));

    bus.addHandler(MOVEMENTS_QUERY, MOVEMENTS_QUERY_HANDLER(container));

    return bus;
  });

  container.setAsync<CommandBus>(SERVICE_ID.BUS.ASYNC_COMMAND, () => {
    const bus = new DomainAsyncCommandBus();

    bus.addHandler(END_DEBT_COMMAND, END_DEBT_COMMAND_HANDLER(container));

    return bus;
  });

  container.setAsync<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, () => {
    const bus = new DomainCommandBus();

    bus.addHandler(
      NEW_DEBT_REQUEST_COMMAND,
      NEW_DEBT_REQUEST_COMMAND_HANDLER(container),
    );

    bus.addHandler(
      CONFIRM_DEBT_REQUEST_COMMAND,
      CONFIRM_DEBT_REQUEST_COMMAND_HANDLER(container),
    );

    bus.addHandler(
      DENY_DEBT_REQUEST_COMMAND,
      DENY_DEBT_REQUEST_COMMAND_HANDLER(container),
    );

    bus.addHandler(NEW_PAY_COMMAND, NEW_PAY_COMMAND_HANDLER(container));

    return bus;
  });
}
