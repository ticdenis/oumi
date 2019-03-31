import { event } from '@oumi-package/core';

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

export const userRegistered = (data: UserRegistered) => event(data);

export const profileUpdated = (data: ProfileUpdated) => event(data);

export const passwordChanged = (data: PasswordChanged) => event(data);


