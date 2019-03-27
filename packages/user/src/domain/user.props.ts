import { stringVO, StringVO, UuidVO, uuidVO } from '@oumi-package/core';

import bcrypt from 'bcrypt';

// Types

export type UserEmail = StringVO;

export type UserFirstname = StringVO;

export type UserId = UuidVO;

export type UserLastname = StringVO;

export type UserNickname = StringVO;

export type UserPassword = StringVO;

export type UserPhone = StringVO;

// Impl

export const userEmailVO = stringVO;

export const userFirstnameVO = stringVO;

export const userIdVO = uuidVO;

export const userLastnameVO = stringVO;

export const userNicknameVO = stringVO;

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
