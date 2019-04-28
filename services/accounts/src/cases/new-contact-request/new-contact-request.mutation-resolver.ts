import {
  ContactRequestCommand,
  ContactRequestData,
} from '@oumi-package/contact/lib';

import { mutationResolver } from '../../shared';

export const newContactRequestMutationResolver = mutationResolver<
  ContactRequestData
>(ContactRequestCommand);
