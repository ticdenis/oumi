import { eitherToPromise, QueryHandler } from '@oumi-package/shared/lib/core';

import { contactIdVO } from '../../domain';

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
      id: contactIdVO(query.data.id),
    }),
  );
