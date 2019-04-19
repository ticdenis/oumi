import { Query } from '@oumi-package/shared/lib/core';

export interface ProfileData {
  id: string;
}

export class ProfileQuery extends Query<ProfileData> {}
