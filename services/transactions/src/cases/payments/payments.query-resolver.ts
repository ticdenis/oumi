import {
  PaymentsData,
  PaymentsQuery,
  PaymentsResponse,
} from '@oumi-package/movement/lib/application';

import { queryResolver } from '../../shared';

export const paymentsQueryResolver = queryResolver<
  PaymentsData,
  PaymentsResponse
>(PaymentsQuery);
