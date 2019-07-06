import {
  DebtRequestsData,
  DebtRequestsQuery,
  DebtRequestsResponse,
} from '@oumi-package/movement/lib/application';

import { queryResolver } from '../../shared';

export const debtRequestsQueryResolver = queryResolver<
  DebtRequestsData,
  DebtRequestsResponse
>(DebtRequestsQuery);
