import * as R from 'ramda';

import { Contact } from '../../domain';

export type UserContactsResponse = {
  debts: { amount: number; currency: string }[];
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
}[];

export type UserContactsTransformer = (
  contacts: Contact[],
) => UserContactsResponse;

export const userContactsTransformer: UserContactsTransformer = R.map(
  contact => ({
    debts: contact.debts.map(debt => ({
      amount: debt.amount.value.amount.value,
      currency: debt.amount.value.currency.value.code.value,
    })),
    firstname: contact.firstname.value,
    id: contact.id.value,
    lastname: contact.lastname.value,
    nickname: contact.nickname.value,
  }),
);
