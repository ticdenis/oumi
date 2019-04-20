import {
  ChangePasswordCommand,
  ChangePasswordData,
} from '@oumi-package/user/lib';

import { mutationResolver } from '../../util';

export const changePasswordMutationResolver = mutationResolver<
  ChangePasswordData
>(ChangePasswordCommand);
