import { amountVO } from '@oumi-package/shared/lib/domain/amount.props';
import {
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
} from '@oumi-package/shared/lib/domain/user.props';

import * as R from 'ramda';

import { Contact, ContactDomainError, ContactMapper } from '../domain';

const item = R.ifElse(
  R.has('id'),
  source =>
    new Contact({
      debts: R.map(
        debt => ({
          amount: amountVO(debt.amount),
          id: userIdVO(debt.id),
        }),
        source.debts,
      ),
      firstname: userFirstnameVO(source.firstname),
      id: userIdVO(source.id),
      lastname: userLastnameVO(source.lastname),
      nickname: userNicknameVO(source.nickname),
    }),
  source => {
    throw ContactDomainError.invalidSource(source);
  },
);

export const jsonContactMapper: ContactMapper<object> = {
  item,
  items: R.map(item),
};
