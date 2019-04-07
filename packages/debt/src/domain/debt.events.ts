import { event } from '@oumi-package/core/lib';

export type DebtEvents = DebtNewRequested;

export interface DebtNewRequested {
  amount: number;
  concept: string;
  debtorId: string;
  id: string;
  loanerId: string;
}

export const debtNewRequested = (data: DebtNewRequested) => event(data);
