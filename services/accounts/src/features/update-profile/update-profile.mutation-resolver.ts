import {
  UpdateProfileCommand,
  UpdateProfileData,
} from '@oumi-package/user/lib';

import { mutationResolver } from '../../util';

export const updateProfileMutationResolver = mutationResolver<
  UpdateProfileData
>(UpdateProfileCommand);
