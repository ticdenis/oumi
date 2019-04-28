import {
  ProfileData,
  ProfileQuery,
  ProfileResponse,
} from '@oumi-package/user/lib';

import { queryResolver } from '../../shared';

export const profileQueryResolver = queryResolver<ProfileData, ProfileResponse>(
  ProfileQuery,
);
