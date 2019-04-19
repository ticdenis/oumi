import { Query } from '@oumi-package/shared/lib/core';

export interface ContactRequestsData {
  id: string;
}

export class ContactRequestsQuery extends Query<ContactRequestsData> {}
