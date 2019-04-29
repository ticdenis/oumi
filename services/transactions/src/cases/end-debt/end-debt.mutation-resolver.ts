import {
  EndDebtCommand,
  EndDebtData,
} from '@oumi-package/movement/lib/application';

import { mutationResolver } from '../../shared';

export const endDebtMutationResolver = mutationResolver<EndDebtData>(
  EndDebtCommand,
);
