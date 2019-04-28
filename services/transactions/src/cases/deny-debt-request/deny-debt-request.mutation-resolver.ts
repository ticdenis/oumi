import {
  DenyDebtRequestCommand,
  DenyDebtRequestData,
} from '@oumi-package/debt/lib/application';

import { mutationResolver } from '../../shared';

export const denyDebtRequestMutationResolver = mutationResolver<
  DenyDebtRequestData
>(DenyDebtRequestCommand);
