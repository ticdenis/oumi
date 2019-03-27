import { Query } from '@oumi-package/core';

export interface UserTokenData {
  email: string;
  password: string;
}

export class UserTokenQuery extends Query<UserTokenData> {}
