import { Query } from '@oumi-package/core';

export interface UserContactsData {
  id: string;
}

export class UserContactsQuery extends Query<UserContactsData> {}
