import {
  DenyContactRequestCommand,
  DenyContactRequestData,
} from '@oumi-package/contact/lib';

import { mutationResolver } from '../../shared';

export const denyContactRequestMutationResolver = mutationResolver<
  DenyContactRequestData
>(DenyContactRequestCommand);
