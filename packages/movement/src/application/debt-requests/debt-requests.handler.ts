import { eitherToPromise, QueryHandler } from '@oumi-package/shared/lib/core';
import { userIdVO } from '@oumi-package/shared/lib/domain/user.props';

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
      debtorId: userIdVO(query.id),
    }),
  );
