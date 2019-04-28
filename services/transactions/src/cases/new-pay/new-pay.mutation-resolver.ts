import {
  NewPayCommand,
  NewPayData,
} from '@oumi-package/payment/lib/application';

import { mutationResolver } from '../../shared';

export const newPayMutationResolver = mutationResolver<NewPayData>(
  NewPayCommand,
);
