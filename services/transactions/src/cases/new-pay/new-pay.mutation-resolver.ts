import {
  NewPayCommand,
  NewPayData,
} from '@oumi-package/movement/lib/application';

import { mutationResolver } from '../../shared';

export const newPayMutationResolver = mutationResolver<NewPayData>(
  NewPayCommand,
);
