import { event, eventType } from '@oumi-package/shared/lib/core';

export type ContactEvents = RequestCreated | RequestConfirmed | RequestDenied;

export interface RequestCreated {
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

export const requestCreated = (data: RequestCreated) =>
  event(eventType('contact', 1, 'contact', 'request-created'))(data);

export const requestConfirmed = (data: RequestConfirmed) =>
  event(eventType('contact', 1, 'contact', 'request-confirmed'))(data);

export const requestDenied = (data: RequestDenied) =>
  event(eventType('contact', 1, 'contact', 'request-denied'))(data);
