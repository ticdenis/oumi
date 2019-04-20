import { changePasswordMutationResolver } from '../../../features/change-password';
// import { newContactRequestMutationResolver } from '../../../features/new-contact-request';
import { updateProfileMutationResolver } from '../../../features/update-profile';
import { userRegistrationMutationResolver } from '../../../features/user-registration';

export const MUTATION_RESOLVER = {
  changePassword: changePasswordMutationResolver,
  newContactRequest: () => {
    throw Error('No FUNCIONA');
  },
  updateProfile: updateProfileMutationResolver,
  userRegistration: userRegistrationMutationResolver,
};
