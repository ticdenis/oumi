import {
  UserTokenData,
  UserTokenQuery,
  UserTokenResponse,
} from '@oumi-package/user/lib';

import { queryResolver } from '../../util';

export const userTokenQueryResolver = queryResolver<
  UserTokenData,
  UserTokenResponse
>(UserTokenQuery);
