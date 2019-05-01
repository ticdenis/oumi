import { event, eventType } from '@oumi-package/shared/lib/core';

export type UserEvents = UserRegistered | ProfileUpdated | PasswordChanged;

export interface UserRegistered {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}

export interface ProfileUpdated {
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}

export interface PasswordChanged {
  id: string;
}

export const userRegistered = (data: UserRegistered) =>
  event(eventType('user', 1, 'user', 'user-registered'))(data);

export const profileUpdated = (data: ProfileUpdated) =>
  event(eventType('user', 1, 'user', 'profile-updated'))(data);

export const passwordChanged = (data: PasswordChanged) =>
  event(eventType('user', 1, 'user', 'password-changed'))(data);
