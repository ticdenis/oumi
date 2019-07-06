import { event, eventType } from '@oumi-package/shared/lib/core';

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

export const debtNewRequested = (data: DebtNewRequested) =>
  event(eventType('movement', 1, 'debt', 'debt-new-requested'))(data);

export const debtRequestConfirmed = (data: DebtRequestConfirmed) =>
  event(eventType('movement', 1, 'debt', 'debt-request-confirmed'))(data);

export const debRequestDenied = (data: DebRequestDenied) =>
  event(eventType('movement', 1, 'debt', 'debt-request-denied'))(data);

export const debtCompleted = (data: DebtCompleted) =>
  event(eventType('movement', 1, 'debt', 'debt-completed'))(data);
