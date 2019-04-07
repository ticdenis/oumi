import { DataTransformer } from '@oumi-package/core/lib';

import * as R from 'ramda';

import { Contact } from '../../domain';

export type UserContactsResponse = {
  debts: { amount: number; currency: string }[];
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
}[];

export const userContactsTransformer: DataTransformer<
  Contact[],
  UserContactsResponse
> = R.map(contact => ({
  debts: contact.debts.map(debt => ({
    amount: debt.amount.value.amount,
    currency: debt.amount.value.currency.code,
  })),
  firstname: contact.firstname.value,
  id: contact.id.value,
  lastname: contact.lastname.value,
  nickname: contact.nickname.value,
}));
