import { confirmDebtRequestMutationResolver } from '../../../cases/confirm-debt-request';
import { denyDebtRequestMutationResolver } from '../../../cases/deny-debt-request';
import { newDebtRequestMutationResolver } from '../../../cases/new-debt-request';
import { newPayMutationResolver } from '../../../cases/new-pay';

export const MUTATION_RESOLVER = {
  confirmDebtRequest: confirmDebtRequestMutationResolver,
  denyDebtRequest: denyDebtRequestMutationResolver,
  newDebtRequest: newDebtRequestMutationResolver,
  newPay: newPayMutationResolver,
};
