import {
  ChangePasswordCommand,
  ChangePasswordData,
  UpdateProfileCommand,
  UpdateProfileData,
  UserRegistrationCommand,
  UserRegistrationData,
} from '@oumi-package/user/lib';

import { mutationResolver } from './util';

export const MUTATION_RESOLVER = {
  changePassword: mutationResolver<ChangePasswordData>(ChangePasswordCommand),
  updateProfile: mutationResolver<UpdateProfileData>(UpdateProfileCommand),
  userRegistration: mutationResolver<UserRegistrationData>(
    UserRegistrationCommand,
  ),
};
