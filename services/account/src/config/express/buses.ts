import {
  CommandBus,
  DomainCommandBus,
  DomainEventPublisher,
  DomainQueryBus,
  EventPublisher,
  Oumi,
  QueryBus,
} from '@oumi-package/core';

import { SERVICE_ID } from '..';
import { COMMAND_HANDLERS } from '../../handler/command';
import { QUERY_HANDLERS } from '../../handler/query';

export function loadBuses(container: Oumi.Container) {
  container.set<EventPublisher>(
    SERVICE_ID.EVENT_PUBLISHER,
    DomainEventPublisher.instance(),
  );

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
