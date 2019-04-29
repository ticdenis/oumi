import {
  NewDebtRequestCommand,
  NewDebtRequestData,
} from '@oumi-package/movement/lib/application';

import { mutationResolver } from '../../shared';

export const newDebtRequestMutationResolver = mutationResolver<
  NewDebtRequestData
>(NewDebtRequestCommand);
