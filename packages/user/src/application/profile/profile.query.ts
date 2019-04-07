import { Query } from '@oumi-package/core/lib';

export interface ProfileData {
  id: string;
}

export class ProfileQuery extends Query<ProfileData> {}
