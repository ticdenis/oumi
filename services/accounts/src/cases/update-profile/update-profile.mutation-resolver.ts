import {
  UpdateProfileCommand,
  UpdateProfileData,
} from '@oumi-package/user/lib';

import { mutationResolver } from '../../shared';

export const updateProfileMutationResolver = mutationResolver<
  UpdateProfileData
>(UpdateProfileCommand);
