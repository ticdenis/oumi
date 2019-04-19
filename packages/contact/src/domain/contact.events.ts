import { event } from '@oumi-package/shared/lib/core';

export type ContactEvents = NewRequested | RequestConfirmed | RequestDenied;

export interface NewRequested {
  contactId: string;
  message: string | null;
  requesterId: string;
}

export interface RequestConfirmed {
  contactId: string;
  requesterId: string;
}

export interface RequestDenied {
  contactId: string;
  requesterId: string;
}

export const newRequested = (data: NewRequested) => event(data);

export const requestConfirmed = (data: RequestConfirmed) => event(data);

export const requestDenied = (data: RequestDenied) => event(data);
