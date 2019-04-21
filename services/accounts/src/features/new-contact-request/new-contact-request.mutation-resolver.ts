import {
  ContactRequestCommand,
  ContactRequestData,
} from '@oumi-package/contact/lib';

import { mutationResolver } from '../../util';

export const newContactRequestMutationResolver = mutationResolver<
  ContactRequestData
>(ContactRequestCommand);
