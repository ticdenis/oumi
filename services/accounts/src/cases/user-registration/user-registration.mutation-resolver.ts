import {
  UserRegistrationCommand,
  UserRegistrationData,
} from '@oumi-package/user/lib';

import { mutationResolver } from '../../shared';

export const userRegistrationMutationResolver = mutationResolver<
  UserRegistrationData
>(UserRegistrationCommand);
