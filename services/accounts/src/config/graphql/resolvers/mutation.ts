import { changePasswordMutationResolver } from '../../../features/change-password';
import { newContactRequestMutationResolver } from '../../../features/new-contact-request';
import { updateProfileMutationResolver } from '../../../features/update-profile';
import { userRegistrationMutationResolver } from '../../../features/user-registration';

export const MUTATION_RESOLVER = {
  changePassword: changePasswordMutationResolver,
  newContactRequest: newContactRequestMutationResolver,
  updateProfile: updateProfileMutationResolver,
  userRegistration: userRegistrationMutationResolver,
};
