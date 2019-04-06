import { eitherToPromise, QueryHandler, stringVO } from '@oumi-package/core';

import { userEmailVO } from '../../domain';

import { UserTokenQuery, UserTokenResponse, UserTokenService } from './';

export type UserQueryHandler = (
  service: UserTokenService,
) => QueryHandler<UserTokenQuery, UserTokenResponse>;

export const userTokenHandler: UserQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      email: userEmailVO(query.data.email),
      password: stringVO(query.data.password),
    }),
  );
