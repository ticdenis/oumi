import { stringVO, StringVO } from '@oumi-package/core/lib';
export {
  UserFirstname,
  UserId,
  UserLastname,
  UserNickname,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
} from '@oumi-package/shared/lib/domain/user.props';

import bcrypt from 'bcrypt';

// Types

export type UserEmail = StringVO;

export type UserPassword = StringVO;

export type UserPhone = StringVO;

// Impl

export const userEmailVO = stringVO;

const HASH_SALTS = 10;

export const userPasswordVO = (
  value: string,
  encrypt: boolean = true,
): UserPassword => {
  const _value = encrypt
    ? bcrypt.hashSync(stringVO(value).value, HASH_SALTS)
    : value;

  return {
    equalsTo: other => bcrypt.compareSync(other.value, _value),
    value: _value,
  };
};

export const userPhoneVO = stringVO;
