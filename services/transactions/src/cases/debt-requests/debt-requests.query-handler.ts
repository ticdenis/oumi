import {
  debtRequestsBuilderService,
  debtRequestsHandler,
  DebtRequestsQuery,
} from '@oumi-package/debt/lib/application';
import { DebtQueryRepository } from '@oumi-package/debt/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const DEBT_REQUESTS_QUERY = DebtRequestsQuery.name;

export const DEBT_REQUESTS_QUERY_HANDLER = (container: Oumi.Container) =>
  debtRequestsHandler(
    debtRequestsBuilderService({
      queryRepository: container.get<DebtQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.DEBT,
      ),
    }),
  );
