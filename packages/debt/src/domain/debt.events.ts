import { event } from '@oumi-package/core/lib';

export type DebtEvents =
  | DebtNewRequested
  | DebRequestConfirmed
  | DebRequestDenied;

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

export interface DebRequestDenied {
  debtorId: string;
  id: string;
  loanerId: string;
}

export const debtNewRequested = (data: DebtNewRequested) => event(data);

export const debRequestConfirmed = (data: DebRequestConfirmed) => event(data);

export const debRequestDenied = (data: DebRequestDenied) => event(data);
