import { Query } from '@oumi-package/shared/lib/core';

export interface PaymentsData {
  debtorId: string;
}

export class PaymentsQuery extends Query<PaymentsData> {}
