import {
  NullableStringVO,
  nullableStringVO,
  simpleValueObject,
  StringVO,
  stringVO,
  ValueObject,
  ValueObjectDomainError,
} from '@oumi-package/core/lib';
import {
  AmountVO,
  amountVO,
} from '@oumi-package/shared/lib/domain/amount.props';
import {
  UserFirstname,
  userFirstnameVO,
  UserId,
  userIdVO,
  UserLastname,
  userLastnameVO,
  UserNickname,
  userNicknameVO,
} from '@oumi-package/shared/lib/domain/user.props';

import * as t from 'io-ts';

export interface ContactDebt {
  amount: ContactAmountVO;
  id: ContactId;
}

// Types

export type ContactFullname = StringVO;

export type ContactId = UserId;

export type ContactNickname = UserNickname;

export type ContactFirstname = UserFirstname;

export type ContactLastname = UserLastname;

export type ContactAmountVO = AmountVO;

// Impl

export const contactNicknameVO = userNicknameVO;

export const contactFirstnameVO = userFirstnameVO;

export const contactLastnameVO = userLastnameVO;

export const contactIdVO = userIdVO;

export const contactMessageVO = nullableStringVO;

export const contactAmountVO = amountVO;

export type ContactMessage = NullableStringVO;

export interface ContactRequest {
  id: ContactId;
  fullname: ContactFullname;
  nickname: UserNickname;
  message: NullableStringVO;
  status: ContactRequestStatusVO;
}

export type ContactRequestStatus =
  | 'SENDED'
  | 'PENDING'
  | 'ACCEPTED'
  | 'REFUSED';

export type ContactRequestStatusVO = ValueObject<ContactRequestStatus>;

export const contactFullnameVO = (value: {
  firstname: string;
  lastname: string;
}): ContactFullname => stringVO(`${value.firstname} ${value.lastname}`);

const isString = (u: unknown): u is string => typeof u === 'string';

const requestStatusType = new t.Type<string, string, unknown>(
  'string',
  isString,
  (u, c) =>
    isString(u) && ['SENDED', 'PENDING', 'ACCEPTED', 'REFUSED'].includes(u)
      ? t.success(u)
      : t.failure(u, c),
  t.identity,
);

export const contactRequestStatusVO = (
  value: string,
): ContactRequestStatusVO => {
  if (requestStatusType.decode(value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_CONTACT_REQUEST_STATUS', value);
  }

  return simpleValueObject<ContactRequestStatus>(value as any);
};
