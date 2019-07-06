import {
  paymentsBuilderService,
  paymentsHandler,
  PaymentsQuery,
} from '@oumi-package/movement/lib/application';
import { PaymentQueryRepository } from '@oumi-package/movement/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const PAYMENTS_QUERY = PaymentsQuery.name;

export const PAYMENTS_QUERY_HANDLER = (container: Oumi.Container) =>
  paymentsHandler(
    paymentsBuilderService({
      queryRepository: container.get<PaymentQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.PAYMENT,
      ),
    }),
  );
