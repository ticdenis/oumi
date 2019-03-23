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
} from '@oumi-package/core/lib';

import { SERVICE_ID } from '..';
import { COMMAND_HANDLERS } from '../../handler/command';
import { QUERY_HANDLERS } from '../../handler/query';

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

  container.setAsync<QueryBus>(SERVICE_ID.BUS.QUERY, () => {
    const bus = DomainQueryBus.instance();
    QUERY_HANDLERS(container).forEach(handler => bus.addHandler(...handler));
    return bus;
  });

  container.setAsync<CommandBus>(SERVICE_ID.BUS.COMMAND, () => {
    const bus = DomainCommandBus.instance();
    COMMAND_HANDLERS(container).forEach(handler => bus.addHandler(...handler));
    return bus;
  });
}
