import { Oumi } from '@oumi-package/shared/lib/core';
import {
  TokenFactory,
  UserQueryRepository,
  userTokenBuilderService,
  userTokenHandler,
  UserTokenQuery,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '../../config';

export const USER_TOKEN_QUERY = UserTokenQuery.name;

export const USER_TOKEN_QUERY_HANDLER = (container: Oumi.Container) =>
  userTokenHandler(
    userTokenBuilderService({
      queryRepository: container.get<UserQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.USER,
      ),
      tokenFactory: container.get<TokenFactory>(SERVICE_ID.TOKEN_FACTORY),
    }),
  );
