import {
  EndDebtCommand,
  EndDebtData,
} from '@oumi-package/debt/lib/application';

import { mutationResolver } from '../../shared';

export const endDebtMutationResolver = mutationResolver<EndDebtData>(
  EndDebtCommand,
);
