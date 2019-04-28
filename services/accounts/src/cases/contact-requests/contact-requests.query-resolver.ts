import {
  ContactRequestsData,
  ContactRequestsQuery,
  ContactRequestsResponse,
} from '@oumi-package/contact';

import { queryResolver } from '../../shared';

export const contactRequestsQueryResolver = queryResolver<
  ContactRequestsData,
  ContactRequestsResponse
>(ContactRequestsQuery);
