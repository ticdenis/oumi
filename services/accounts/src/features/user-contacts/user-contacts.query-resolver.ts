import {
  UserContactsData,
  UserContactsQuery,
  UserContactsResponse,
} from '@oumi-package/contact';

import { queryResolver } from '../../util';

export const userContactsQueryResolver = queryResolver<
  UserContactsData,
  UserContactsResponse
>(UserContactsQuery);
