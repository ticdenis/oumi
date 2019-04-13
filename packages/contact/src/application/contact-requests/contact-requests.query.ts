import { Query } from '@oumi-package/core';

export interface ContactRequestsData {
  id: string;
}

export class ContactRequestsQuery extends Query<ContactRequestsData> {}
