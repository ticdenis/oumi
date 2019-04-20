import {
  NewDebtRequestCommand,
  NewDebtRequestData,
} from '@oumi-package/debt/lib/application';

import { mutationResolver } from '../../util';

export const newDebtRequestMutationResolver = mutationResolver<
  NewDebtRequestData
>(NewDebtRequestCommand);
