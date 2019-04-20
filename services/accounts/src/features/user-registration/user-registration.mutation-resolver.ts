import {
  UserRegistrationCommand,
  UserRegistrationData,
} from '@oumi-package/user/lib';

import { mutationResolver } from '../../util';

export const userRegistrationMutationResolver = mutationResolver<
  UserRegistrationData
>(UserRegistrationCommand);
