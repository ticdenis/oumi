import {
  UserTokenData,
  UserTokenQuery,
  UserTokenResponse,
} from '@oumi-package/user/lib';

import { queryResolver } from '../../shared';

export const userTokenQueryResolver = queryResolver<
  UserTokenData,
  UserTokenResponse
>(UserTokenQuery);
