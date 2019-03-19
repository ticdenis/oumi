import { stringVO, StringVO, UuidVO, uuidVO } from '@oumi-package/core';

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

export const userPasswordVO = stringVO;

export const userPhoneVO = stringVO;
