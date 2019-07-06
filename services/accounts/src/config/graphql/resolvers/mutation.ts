import { changePasswordMutationResolver } from '../../../cases/change-password';
import { confirmContactRequestMutationResolver } from '../../../cases/confirm-contact-request';
import { denyContactRequestMutationResolver } from '../../../cases/deny-contact-request';
import { newContactRequestMutationResolver } from '../../../cases/new-contact-request';
import { updateProfileMutationResolver } from '../../../cases/update-profile';
import { userRegistrationMutationResolver } from '../../../cases/user-registration';

export const MUTATION_RESOLVER = {
  changePassword: changePasswordMutationResolver,
  confirmContactRequest: confirmContactRequestMutationResolver,
  denyContactRequest: denyContactRequestMutationResolver,
  newContactRequest: newContactRequestMutationResolver,
  updateProfile: updateProfileMutationResolver,
  userRegistration: userRegistrationMutationResolver,
};
