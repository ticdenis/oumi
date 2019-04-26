import {
  ConfirmContactRequestCommand,
  ConfirmContactRequestData,
} from '@oumi-package/contact/lib';

import { mutationResolver } from '../../util';

export const confirmContactRequestMutationResolver = mutationResolver<
  ConfirmContactRequestData
>(ConfirmContactRequestCommand);
