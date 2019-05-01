import {
  MovementsData,
  MovementsQuery,
  MovementsResponse,
} from '@oumi-package/movement/lib/application';

import { queryResolver } from '../../shared';

export const movementsQueryResolver = queryResolver<
  MovementsData,
  MovementsResponse
>(MovementsQuery);
