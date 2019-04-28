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

import { SERVICE_ID } from '..';
import {
  CHANGE_PASSWORD_COMMAND,
  CHANGE_PASSWORD_COMMAND_HANDLER,
} from '../../cases/change-password';
import {
  CONFIRM_CONTACT_REQUEST_COMMAND,
  CONFIRM_CONTACT_REQUEST_COMMAND_HANDLER,
} from '../../cases/confirm-contact-request';
import {
  CONTACT_REQUESTS_QUERY,
  CONTACT_REQUESTS_QUERY_HANDLER,
} from '../../cases/contact-requests';
import {
  DENY_CONTACT_REQUEST_COMMAND,
  DENY_CONTACT_REQUEST_COMMAND_HANDLER,
} from '../../cases/deny-contact-request';
import {
  NEW_CONTACT_REQUEST_COMMAND,
  NEW_CONTACT_REQUEST_COMMAND_HANDLER,
} from '../../cases/new-contact-request';
import { PROFILE_QUERY, PROFILE_QUERY_HANDLER } from '../../cases/profile';
import {
  UPDATE_PROFILE_COMMAND,
  UPDATE_PROFILE_COMMAND_HANDLER,
} from '../../cases/update-profile';
import {
  USER_CONTACTS_QUERY,
  USER_CONTACTS_QUERY_HANDLER,
} from '../../cases/user-contacts';
import {
  USER_REGISTRATION_COMMAND,
  USER_REGISTRATION_COMMAND_HANDLER,
} from '../../cases/user-registration';
import {
  USER_TOKEN_QUERY,
  USER_TOKEN_QUERY_HANDLER,
} from '../../cases/user-token';

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

    bus.addHandler(PROFILE_QUERY, PROFILE_QUERY_HANDLER(container));

    bus.addHandler(USER_CONTACTS_QUERY, USER_CONTACTS_QUERY_HANDLER(container));

    bus.addHandler(USER_TOKEN_QUERY, USER_TOKEN_QUERY_HANDLER(container));

    bus.addHandler(
      CONTACT_REQUESTS_QUERY,
      CONTACT_REQUESTS_QUERY_HANDLER(container),
    );

    return bus;
  });

  container.setAsync<CommandBus>(SERVICE_ID.BUS.ASYNC_COMMAND, () => {
    const bus = DomainAsyncCommandBus.instance();

    return bus;
  });

  container.setAsync<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, () => {
    const bus = DomainCommandBus.instance();

    bus.addHandler(
      CHANGE_PASSWORD_COMMAND,
      CHANGE_PASSWORD_COMMAND_HANDLER(container),
    );

    bus.addHandler(
      UPDATE_PROFILE_COMMAND,
      UPDATE_PROFILE_COMMAND_HANDLER(container),
    );

    bus.addHandler(
      USER_REGISTRATION_COMMAND,
      USER_REGISTRATION_COMMAND_HANDLER(container),
    );

    bus.addHandler(
      NEW_CONTACT_REQUEST_COMMAND,
      NEW_CONTACT_REQUEST_COMMAND_HANDLER(container),
    );

    bus.addHandler(
      CONFIRM_CONTACT_REQUEST_COMMAND,
      CONFIRM_CONTACT_REQUEST_COMMAND_HANDLER(container),
    );

    bus.addHandler(
      DENY_CONTACT_REQUEST_COMMAND,
      DENY_CONTACT_REQUEST_COMMAND_HANDLER(container),
    );

    return bus;
  });
}
