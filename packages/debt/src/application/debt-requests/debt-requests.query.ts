import { Query } from '@oumi-package/core';

export interface DebtRequestsData {
  debtorId: string;
}

export class DebtRequestsQuery extends Query<DebtRequestsData> {}
