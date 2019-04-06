import { Query } from '@oumi-package/core';

import { Token } from '../../domain';

export interface UserTokenData {
  email: string;
  password: string;
}

export type UserTokenResponse = Token;

export class UserTokenQuery extends Query<UserTokenData> {}
