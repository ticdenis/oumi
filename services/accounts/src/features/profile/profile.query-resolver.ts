import {
  ProfileData,
  ProfileQuery,
  ProfileResponse,
} from '@oumi-package/user/lib';

import { queryResolver } from '../../util';

export const profileQueryResolver = queryResolver<ProfileData, ProfileResponse>(
  ProfileQuery,
);
