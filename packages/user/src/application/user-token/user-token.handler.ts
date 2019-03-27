import { eitherToPromise, QueryHandler, stringVO } from '@oumi-package/core';

import { Token, userEmailVO } from '../../domain';

import { UserTokenQuery } from './user-token.query';
import { UserTokenService } from './user-token.service';

export type UserQueryHandler = (
  service: UserTokenService,
) => QueryHandler<UserTokenQuery, Token>;

export const userTokenHandler: UserQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      email: userEmailVO(query.data.email),
      password: stringVO(query.data.password),
    }),
  );
