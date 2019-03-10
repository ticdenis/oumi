import { event } from '@oumi-package/shared';

export interface UserRegistered {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
}

export const userRegistered = (data: UserRegistered) => event(data);
