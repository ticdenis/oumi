import {
  ChangePasswordCommand,
  ChangePasswordData,
} from '@oumi-package/user/lib';

import { mutationResolver } from '../../shared';

export const changePasswordMutationResolver = mutationResolver<
  ChangePasswordData
>(ChangePasswordCommand);
