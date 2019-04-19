import {
  NullableStringVO,
  nullableStringVO,
  simpleValueObject,
  StringVO,
  stringVO,
  ValueObject,
  ValueObjectDomainError,
} from '@oumi-package/shared/lib/core';
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

export type ContactMessage = NullableStringVO;

export type ContactRequestStatus =
  | 'SENDED'
  | 'PENDING'
  | 'CONFIRMED'
  | 'REFUSED';

export type ContactRequestStatusVO = ValueObject<ContactRequestStatus>;

export interface ContactRequest {
  id: ContactId;
  fullname: ContactFullname;
  nickname: UserNickname;
  message: NullableStringVO;
  status: ContactRequestStatusVO;
}

// Impl

export const contactNicknameVO = userNicknameVO;

export const contactFirstnameVO = userFirstnameVO;

export const contactLastnameVO = userLastnameVO;

export const contactIdVO = userIdVO;

export const contactMessageVO = nullableStringVO;

export const contactAmountVO = amountVO;

export const CONTACT_REQUEST_SENDED_STATUS: ContactRequestStatus = 'SENDED';

export const CONTACT_REQUEST_PENDING_STATUS: ContactRequestStatus = 'PENDING';

export const CONTACT_REQUEST_CONFIRMED_STATUS: ContactRequestStatus =
  'CONFIRMED';

export const CONTACT_REQUEST_REFUSED_STATUS: ContactRequestStatus = 'REFUSED';

export const contactFullnameVO = (value: {
  firstname: string;
  lastname: string;
}): ContactFullname => stringVO(`${value.firstname} ${value.lastname}`);

export const contactRequestStatusVO = (
  value: string,
): ContactRequestStatusVO => {
  if (
    ![
      CONTACT_REQUEST_SENDED_STATUS,
      CONTACT_REQUEST_PENDING_STATUS,
      CONTACT_REQUEST_CONFIRMED_STATUS,
      CONTACT_REQUEST_REFUSED_STATUS,
    ].includes(value as any)
  ) {
    throw new ValueObjectDomainError('INVALID_CONTACT_REQUEST_STATUS', value);
  }

  return simpleValueObject<ContactRequestStatus>(value as any);
};
