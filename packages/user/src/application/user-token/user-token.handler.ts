import { eitherToPromise, QueryHandler, stringVO } from '@oumi-package/core';

import { userEmailVO } from '../../domain';

import { UserTokenQuery } from './user-token.query';
import { UserTokenResponse, UserTokenService } from './user-token.service';

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
