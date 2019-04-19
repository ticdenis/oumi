import { EventPublisher } from '@oumi-package/shared/lib/core';
import {
  changePasswordBuilderService,
  ChangePasswordCommand,
  changePasswordHandler,
  UserCommandRepository,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '../../config';

import { MakeCommandHandler } from '.';

const handler: MakeCommandHandler = container => {
  return [
    ChangePasswordCommand.name,
    changePasswordHandler(
      changePasswordBuilderService({
        commandRepository: container.get<UserCommandRepository>(
          SERVICE_ID.COMMAND_REPOSITORY.USER,
        ),
        eventPublisher: container.get<EventPublisher>(
          SERVICE_ID.EVENT_PUBLISHER,
        ),
        queryRepository: container.get<UserQueryRepository>(
          SERVICE_ID.QUERY_REPOSITORY.USER,
        ),
      }),
    ),
  ];
};

export default handler;
