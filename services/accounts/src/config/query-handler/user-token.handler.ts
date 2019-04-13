import {
  TokenFactory,
  UserQueryRepository,
  userTokenBuilderService,
  userTokenHandler,
  UserTokenQuery,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '..';

import { MakeQueryHandler } from '.';

const handler: MakeQueryHandler = container => {
  return [
    UserTokenQuery.name,
    userTokenHandler(
      userTokenBuilderService({
        queryRepository: container.get<UserQueryRepository>(
          SERVICE_ID.QUERY_REPOSITORY.USER,
        ),
        tokenFactory: container.get<TokenFactory>(SERVICE_ID.TOKEN_FACTORY),
      }),
    ),
  ];
};

export default handler;
