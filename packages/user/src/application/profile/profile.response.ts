import { DataTransformer } from '@oumi-package/core';

import { User } from '../../domain';

export interface ProfileResponse {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}

export const profileDataTransformer: DataTransformer<
  User,
  ProfileResponse
> = user => ({
  email: user.email.value,
  firstname: user.firstname.value,
  id: user.id.value,
  lastname: user.lastname.value,
  nickname: user.nickname.value,
  phone: user.phone.value,
});
