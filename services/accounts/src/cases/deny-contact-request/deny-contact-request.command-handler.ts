import {
  ContactCommandRepository,
  ContactQueryRepository,
  denyContactRequestBuilderService,
  DenyContactRequestCommand,
  denyContactRequestHandler,
} from '@oumi-package/contact/lib';
import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const DENY_CONTACT_REQUEST_COMMAND = DenyContactRequestCommand.name;

export const DENY_CONTACT_REQUEST_COMMAND_HANDLER = (
  container: Oumi.Container,
) =>
  denyContactRequestHandler(
    denyContactRequestBuilderService({
      commandRepository: container.get<ContactCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.CONTACT,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<ContactQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      ),
    }),
  );
