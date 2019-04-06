import { stringVO, StringVO, UuidVO, uuidVO } from '@oumi-package/core/lib';

// Types

export type UserFirstname = StringVO;

export type UserId = UuidVO;

export type UserLastname = StringVO;

export type UserNickname = StringVO;

// Impl

export const userFirstnameVO = stringVO;

export const userIdVO = uuidVO;

export const userLastnameVO = stringVO;

export const userNicknameVO = stringVO;
