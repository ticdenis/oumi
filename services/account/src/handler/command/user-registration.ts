import { EventPublisher } from '@oumi-package/core';
import {
  UserCommandRepository,
  UserQueryRepository,
  userRegistration,
  UserRegistrationCommand,
  userRegistrationHandler,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '../../config';

import { MakeCommandHandler } from '.';

const handler: MakeCommandHandler = container => {
  return [
    UserRegistrationCommand.name,
    userRegistrationHandler(
      userRegistration({
        commandRepository: container.get<UserCommandRepository>(
          SERVICE_ID.userCommandRepository,
        ),
        eventPublisher: container.get<EventPublisher>('event-publisher'),
        queryRepository: container.get<UserQueryRepository>(
          SERVICE_ID.userQueryRepository,
        ),
      }),
    ),
  ];
};

export default handler;
