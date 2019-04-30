import { eitherToPromise, QueryHandler } from '@oumi-package/shared/lib/core';

import { debtorIdVO } from '../../domain';

import {
  DebtRequestsQuery,
  DebtRequestsResponse,
  DebtRequestsService,
} from '.';

export type DebtRequestsQueryHandler = (
  service: DebtRequestsService,
) => QueryHandler<DebtRequestsQuery, DebtRequestsResponse>;

export const debtRequestsHandler: DebtRequestsQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      debtorId: debtorIdVO(query.id),
    }),
  );
