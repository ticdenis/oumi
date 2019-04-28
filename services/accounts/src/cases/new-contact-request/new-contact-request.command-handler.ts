import {
  ContactCommandRepository,
  ContactQueryRepository,
  contactRequestBuilderService,
  ContactRequestCommand,
  contactRequestHandler,
} from '@oumi-package/contact/lib';
import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const NEW_CONTACT_REQUEST_COMMAND = ContactRequestCommand.name;

export const NEW_CONTACT_REQUEST_COMMAND_HANDLER = (
  container: Oumi.Container,
) =>
  contactRequestHandler(
    contactRequestBuilderService({
      commandRepository: container.get<ContactCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.CONTACT,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<ContactQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      ),
    }),
  );
