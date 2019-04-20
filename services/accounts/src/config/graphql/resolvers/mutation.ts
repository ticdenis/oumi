import { changePasswordMutationResolver } from '../../../features/change-password';
import { updateProfileMutationResolver } from '../../../features/update-profile';
import { userRegistrationMutationResolver } from '../../../features/user-registration';

export const MUTATION_RESOLVER = {
  changePassword: changePasswordMutationResolver,
  updateProfile: updateProfileMutationResolver,
  userRegistration: userRegistrationMutationResolver,
};
