import {
  ConfirmDebtRequestCommand,
  ConfirmDebtRequestData,
} from '@oumi-package/debt/lib/application';

import { mutationResolver } from '../../shared';

export const confirmDebtRequestMutationResolver = mutationResolver<
  ConfirmDebtRequestData
>(ConfirmDebtRequestCommand);
