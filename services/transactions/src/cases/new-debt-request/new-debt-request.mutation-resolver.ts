import {
  NewDebtRequestCommand,
  NewDebtRequestData,
} from '@oumi-package/debt/lib/application';

import { mutationResolver } from '../../shared';

export const newDebtRequestMutationResolver = mutationResolver<
  NewDebtRequestData
>(NewDebtRequestCommand);
