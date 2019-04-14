import { event } from '@oumi-package/core';

export type ContactEvents = NewRequested | RequestConfirmed;

export interface NewRequested {
  contactId: string;
  message: string | null;
  requesterId: string;
}

export interface RequestConfirmed {
  contactId: string;
  requesterId: string;
}

export const newRequested = (data: NewRequested) => event(data);

export const requestConfirmed = (data: RequestConfirmed) => event(data);
