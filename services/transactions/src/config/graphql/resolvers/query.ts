import { debtRequestsQueryResolver } from '../../../cases/debt-requests';
import { paymentsQueryResolver } from '../../../cases/payments';

export const QUERY_RESOLVER = {
  debtRequests: debtRequestsQueryResolver,
  payments: paymentsQueryResolver,
};
