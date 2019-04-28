import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';
import {
  changePasswordBuilderService,
  ChangePasswordCommand,
  changePasswordHandler,
  UserCommandRepository,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '../../config';

export const CHANGE_PASSWORD_COMMAND = ChangePasswordCommand.name;

export const CHANGE_PASSWORD_COMMAND_HANDLER = (container: Oumi.Container) =>
  changePasswordHandler(
    changePasswordBuilderService({
      commandRepository: container.get<UserCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.USER,
      ),
      eventPublisher: container.get<EventPublisher>(SERVICE_ID.EVENT_PUBLISHER),
      queryRepository: container.get<UserQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.USER,
      ),
    }),
  );
