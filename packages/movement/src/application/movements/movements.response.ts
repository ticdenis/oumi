import { DataTransformer } from '@oumi-package/shared/lib/core';

import * as R from 'ramda';

import { Movement } from '../../domain';

export type MovementsResponse = {
  amount: number;
  concept: string;
  date: Date;
  debtId: string;
  message: string | null;
  type: string /* charge or payment */;
}[];

export const movementsTransformer: DataTransformer<
  Movement[],
  MovementsResponse
> = R.map(movement => ({
  amount: movement.quantity.value,
  concept: movement.concept.value,
  date: movement.occurredOn.value,
  debtId: movement.debt.id.value,
  message: movement.message.value,
  type: movement.type,
}));
