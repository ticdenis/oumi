import { Query } from '@oumi-package/shared/lib/core';

export interface UserContactsData {
  id: string;
}

export class UserContactsQuery extends Query<UserContactsData> {}
