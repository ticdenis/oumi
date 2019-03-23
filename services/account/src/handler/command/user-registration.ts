import { EventPublisher } from '@oumi-package/core';
import {
  UserCommandRepository,
  UserQueryRepository,
  userRegistration,
  UserRegistrationCommand,
  userRegistrationHandler,
} from '@oumi-package/user/';

import { SERVICE_ID } from '../../config';

import { MakeCommandHandler } from '.';

const handler: MakeCommandHandler = container => {
  return [
    UserRegistrationCommand.name,
    userRegistrationHandler(
      userRegistration({
        commandRepository: container.get<UserCommandRepository>(
          SERVICE_ID.COMMAND_REPOSITORY.USER,
        ),
        eventPublisher: container.get<EventPublisher>('event-publisher'),
        queryRepository: container.get<UserQueryRepository>(
          SERVICE_ID.QUERY_REPOSITORY.USER,
        ),
      }),
    ),
  ];
};

export default handler;
