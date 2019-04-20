import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';
import {
  UserCommandRepository,
  UserQueryRepository,
  userRegistrationBuilderService,
  UserRegistrationCommand,
  userRegistrationHandler,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '../../config';

export const USER_REGISTRATION_COMMAND = UserRegistrationCommand.name;

export const USER_REGISTRATION_COMMAND_HANDLER = (container: Oumi.Container) =>
  userRegistrationHandler(
    userRegistrationBuilderService({
      commandRepository: container.get<UserCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.USER,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<UserQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.USER,
      ),
    }),
  );
