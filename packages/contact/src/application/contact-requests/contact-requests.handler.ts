import { eitherToPromise, QueryHandler } from '@oumi-package/shared/lib/core';

import { contactIdVO } from '../../domain';

import {
  ContactRequestsQuery,
  ContactRequestsResponse,
  ContactRequestsService,
} from '.';

export type ContactRequestsQueryHandler = (
  service: ContactRequestsService,
) => QueryHandler<ContactRequestsQuery, ContactRequestsResponse>;

export const contactRequestsHandler: ContactRequestsQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      id: contactIdVO(query.data.id),
    }),
  );
