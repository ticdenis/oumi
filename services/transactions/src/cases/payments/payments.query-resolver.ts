import {
  PaymentsData,
  PaymentsQuery,
  PaymentsResponse,
} from '@oumi-package/payment/lib/application';

import { queryResolver } from '../../shared';

export const paymentsQueryResolver = queryResolver<
  PaymentsData,
  PaymentsResponse
>(PaymentsQuery);
