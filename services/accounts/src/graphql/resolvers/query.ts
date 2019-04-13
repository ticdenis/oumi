import {
  UserContactsData,
  UserContactsQuery,
  UserContactsResponse,
} from '@oumi-package/contact/lib';
import {
  ProfileData,
  ProfileQuery,
  ProfileResponse,
  UserTokenData,
  UserTokenQuery,
  UserTokenResponse,
} from '@oumi-package/user/lib';

import { queryResolver } from './util';

export const QUERY_RESOLVER = {
  profile: queryResolver<ProfileData, ProfileResponse>(ProfileQuery),
  userContacts: queryResolver<UserContactsData, UserContactsResponse>(
    UserContactsQuery,
  ),
  userToken: queryResolver<UserTokenData, UserTokenResponse>(UserTokenQuery),
};
