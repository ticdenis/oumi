import {
  ConfirmDebtRequestCommand,
  ConfirmDebtRequestData,
} from '@oumi-package/movement/lib/application';

import { mutationResolver } from '../../shared/';

export const confirmDebtRequestMutationResolver = mutationResolver<
  ConfirmDebtRequestData
>(ConfirmDebtRequestCommand);
