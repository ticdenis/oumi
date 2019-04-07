import {
  NullableStringVO,
  simpleValueObject,
  ValueObject,
  ValueObjectDomainError,
} from '@oumi-package/core/lib';
import { AmountVO } from '@oumi-package/shared/lib/domain/amount.props';
import {
  UserId,
  UserNickname,
} from '@oumi-package/shared/lib/domain/user.props';

import * as t from 'io-ts';

export interface ContactDebt {
  amount: AmountVO;
  id: UserId;
}

export interface ContactRequest {
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
