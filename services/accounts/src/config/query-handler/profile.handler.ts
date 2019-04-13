import {
  profileBuilderService,
  profileHandler,
  ProfileQuery,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '..';

import { MakeQueryHandler } from '.';

const handler: MakeQueryHandler = container => {
  return [
    ProfileQuery.name,
    profileHandler(
      profileBuilderService({
        queryRepository: container.get<UserQueryRepository>(
          SERVICE_ID.QUERY_REPOSITORY.USER,
        ),
      }),
    ),
  ];
};

export default handler;
