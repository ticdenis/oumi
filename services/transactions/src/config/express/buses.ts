import {
  CommandBus,
  DomainCommandBus,
  DomainEventPublisher,
  DomainEventSubscriber,
  DomainQueryBus,
  EventPublisher,
  EventSubscriber,
  Oumi,
  QueryBus,
} from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '..';
import {
  NEW_DEBT_REQUEST_COMMAND,
  NEW_DEBT_REQUEST_COMMAND_HANDLER,
} from '../../features/new-debt-request';

export function loadBuses(container: Oumi.Container) {
  container.setAsync<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER, () => {
    return DomainEventSubscriber.instance();
  });

  container.setAsync<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER, () => {
    const publisher = DomainEventPublisher.instance();
    publisher.subscribe(
      container.get<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER),
    );
    return publisher;
  });

  container.setAsync<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, () => {
    const bus = DomainQueryBus.instance();
    return bus;
  });

  container.setAsync<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, () => {
    const bus = DomainCommandBus.instance();

    bus.addHandler(
      NEW_DEBT_REQUEST_COMMAND,
      NEW_DEBT_REQUEST_COMMAND_HANDLER(container),
    );

    return bus;
  });
}
