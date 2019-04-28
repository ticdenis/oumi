import {
  ConfirmContactRequestCommand,
  ConfirmContactRequestData,
} from '@oumi-package/contact/lib';

import { mutationResolver } from '../../shared';

export const confirmContactRequestMutationResolver = mutationResolver<
  ConfirmContactRequestData
>(ConfirmContactRequestCommand);
