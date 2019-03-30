import { event } from '@oumi-package/core';

export type UserEvents = UserRegistered | ProfileUpdated;

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

export const userRegistered = (data: UserRegistered) => event(data);

export const profileUpdated = (data: ProfileUpdated) => event(data);
