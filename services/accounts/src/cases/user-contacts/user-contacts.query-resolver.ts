import {
  UserContactsData,
  UserContactsQuery,
  UserContactsResponse,
} from '@oumi-package/contact';

import { queryResolver } from '../../shared';

export const userContactsQueryResolver = queryResolver<
  UserContactsData,
  UserContactsResponse
>(UserContactsQuery);
