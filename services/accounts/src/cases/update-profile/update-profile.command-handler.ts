import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';
import {
  updateProfileBuilderService,
  UpdateProfileCommand,
  updateProfileHandler,
  UserCommandRepository,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '../../config';

export const UPDATE_PROFILE_COMMAND = UpdateProfileCommand.name;

export const UPDATE_PROFILE_COMMAND_HANDLER = (container: Oumi.Container) =>
  updateProfileHandler(
    updateProfileBuilderService({
      commandRepository: container.get<UserCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.USER,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<UserQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.USER,
      ),
    }),
  );
