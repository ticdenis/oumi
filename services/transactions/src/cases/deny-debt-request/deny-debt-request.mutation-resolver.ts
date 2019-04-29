import {
  DenyDebtRequestCommand,
  DenyDebtRequestData,
} from '@oumi-package/movement/lib/application';

import { mutationResolver } from '../../shared';

export const denyDebtRequestMutationResolver = mutationResolver<
  DenyDebtRequestData
>(DenyDebtRequestCommand);
