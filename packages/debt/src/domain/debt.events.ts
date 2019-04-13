import { event } from '@oumi-package/core/lib';

export type DebtEvents = DebtNewRequested | DebRequestConfirmed;

export interface DebtNewRequested {
  amount: number;
  concept: string;
  debtorId: string;
  id: string;
  loanerId: string;
}

export interface DebRequestConfirmed {
  debtorId: string;
  id: string;
  loanerId: string;
}

export const debtNewRequested = (data: DebtNewRequested) => event(data);

export const debRequestConfirmed = (data: DebRequestConfirmed) => event(data);
