import { Query } from '@oumi-package/core/lib';

export interface UserContactsData {
  id: string;
}

export class UserContactsQuery extends Query<UserContactsData> {}
