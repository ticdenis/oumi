import { event } from '@oumi-package/shared';

export type UserEvents = UserRegistered;

export interface UserRegistered {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}

export const userRegistered = (data: UserRegistered) => event(data);
