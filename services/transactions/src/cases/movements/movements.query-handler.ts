import {
  movementsBuilderService,
  movementsHandler,
  MovementsQuery,
} from '@oumi-package/movement/lib/application';
import {
  DebtQueryRepository,
  PaymentQueryRepository,
} from '@oumi-package/movement/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const MOVEMENTS_QUERY = MovementsQuery.name;

export const MOVEMENTS_QUERY_HANDLER = (container: Oumi.Container) =>
  movementsHandler(
    movementsBuilderService({
      debtQueryRepository: container.get<DebtQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.DEBT,
      ),
      paymentQueryRepository: container.get<PaymentQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.PAYMENT,
      ),
    }),
  );
