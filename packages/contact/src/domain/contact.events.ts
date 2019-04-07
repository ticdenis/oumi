import { event } from '@oumi-package/core';

export type UserEvents = NewRequested;

export interface NewRequested {
  contactId: string;
  message: string | null;
  requesterId: string;
}

export const newRequested = (data: NewRequested) => event(data);
