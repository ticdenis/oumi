import { Query } from '@oumi-package/shared/lib/core';

export interface DebtRequestsData {
  debtorId: string;
}

export class DebtRequestsQuery extends Query<DebtRequestsData> {}
