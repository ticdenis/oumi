import {
  confirmContactRequestBuilderService,
  ConfirmContactRequestCommand,
  confirmContactRequestHandler,
  ContactCommandRepository,
  ContactQueryRepository,
} from '@oumi-package/contact/lib';
import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const CONFIRM_CONTACT_REQUEST_COMMAND =
  ConfirmContactRequestCommand.name;

export const CONFIRM_CONTACT_REQUEST_COMMAND_HANDLER = (
  container: Oumi.Container,
) =>
  confirmContactRequestHandler(
    confirmContactRequestBuilderService({
      commandRepository: container.get<ContactCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.CONTACT,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<ContactQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      ),
    }),
  );
