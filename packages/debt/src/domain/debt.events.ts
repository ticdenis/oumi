import { event } from '@oumi-package/shared/lib/core';

export type DebtEvents =
  | DebtNewRequested
  | DebtRequestConfirmed
  | DebRequestDenied
  | DebtCompleted;

export interface DebtNewRequested {
  amount: number;
  concept: string;
  debtorId: string;
  id: string;
  loanerId: string;
}

export interface DebtRequestConfirmed {
  debtorId: string;
  id: string;
  loanerId: string;
}

export interface DebRequestDenied {
  debtorId: string;
  id: string;
  loanerId: string;
}

export interface DebtCompleted {
  debtorId: string;
  id: string;
  loanerId: string;
}

export const debtNewRequested = (data: DebtNewRequested) => event(data);

export const debtRequestConfirmed = (data: DebtRequestConfirmed) => event(data);

export const debRequestDenied = (data: DebRequestDenied) => event(data);

export const debtCompleted = (data: DebtCompleted) => event(data);
