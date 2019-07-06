import { confirmDebtRequestMutationResolver } from '../../../cases/confirm-debt-request';
import { denyDebtRequestMutationResolver } from '../../../cases/deny-debt-request';
import { endDebtMutationResolver } from '../../../cases/end-debt';
import { newDebtRequestMutationResolver } from '../../../cases/new-debt-request';
import { newPayMutationResolver } from '../../../cases/new-pay';

export const MUTATION_RESOLVER = {
  confirmDebtRequest: confirmDebtRequestMutationResolver,
  denyDebtRequest: denyDebtRequestMutationResolver,
  endDebt: endDebtMutationResolver,
  newDebtRequest: newDebtRequestMutationResolver,
  newPay: newPayMutationResolver,
};
