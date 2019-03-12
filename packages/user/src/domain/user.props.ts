import { stringVO, StringVO, UuidVO, uuidVO } from '@oumi-package/shared';

export type UserId = UuidVO;

export const userIdVO = uuidVO;

export type UserEmail = StringVO;

export const userEmailVO = stringVO;

export type UserPassword = StringVO;

export const userPasswordVO = stringVO;

export type UserLastname = StringVO;

export const userLastnameVO = stringVO;

export type UserFirstname = StringVO;

export const userFirstnameVO = stringVO;
