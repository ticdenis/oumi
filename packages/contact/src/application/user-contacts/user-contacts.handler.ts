import { eitherToPromise, QueryHandler } from '@oumi-package/core';
import { userIdVO } from '@oumi-package/shared/lib/domain/user.props';

import {
  UserContactsQuery,
  UserContactsResponse,
  UserContactsService,
} from '.';

export type UserContactsQueryHandler = (
  service: UserContactsService,
) => QueryHandler<UserContactsQuery, UserContactsResponse>;

export const userContactsHandler: UserContactsQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      id: userIdVO(query.id),
    }),
  );
