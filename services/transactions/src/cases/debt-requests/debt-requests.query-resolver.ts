import {
  DebtRequestsData,
  DebtRequestsQuery,
  DebtRequestsResponse,
} from '@oumi-package/debt/lib/application';

import { queryResolver } from '../../shared';

export const debtRequestsQueryResolver = queryResolver<
  DebtRequestsData,
  DebtRequestsResponse
>(DebtRequestsQuery);
