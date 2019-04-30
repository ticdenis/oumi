import { Query } from '@oumi-package/shared/lib/core';

export interface MovementsData {
  debtorId: string;
}

export class MovementsQuery extends Query<MovementsData> {}
