import { eitherToPromise, QueryHandler } from '@oumi-package/shared/lib/core';

import { debtorIdVO } from '../../domain';

import { MovementsQuery, MovementsResponse, MovementsService } from '.';

export type MovementsQueryHandler = (
  service: MovementsService,
) => QueryHandler<MovementsQuery, MovementsResponse>;

export const movementsHandler: MovementsQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      debtorId: debtorIdVO(query.id),
    }),
  );
