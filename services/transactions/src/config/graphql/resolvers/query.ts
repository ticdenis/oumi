import { debtRequestsQueryResolver } from '../../../cases/debt-requests';
import { movementsQueryResolver } from '../../../cases/movements';
import { paymentsQueryResolver } from '../../../cases/payments';

export const QUERY_RESOLVER = {
  debtRequests: debtRequestsQueryResolver,
  movements: movementsQueryResolver,
  payments: paymentsQueryResolver,
};
