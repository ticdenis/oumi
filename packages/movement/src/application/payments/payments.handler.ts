import { eitherToPromise, QueryHandler } from '@oumi-package/shared/lib/core';

import { paymentDebtUserIdVO } from '../../domain';

import { PaymentsQuery, PaymentsResponse, PaymentsService } from '.';

export type PaymentsQueryHandler = (
  service: PaymentsService,
) => QueryHandler<PaymentsQuery, PaymentsResponse>;

export const paymentsHandler: PaymentsQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      debtorId: paymentDebtUserIdVO(query.data.debtorId),
    }),
  );
