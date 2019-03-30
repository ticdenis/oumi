import { Query } from '@oumi-package/core';

export interface ProfileData {
  id: string;
}

export class ProfileQuery extends Query<ProfileData> {}
