import * as R from 'ramda';

import {
  Contact,
  contactAmountVO,
  ContactDomainError,
  contactFirstnameVO,
  contactFullnameVO,
  contactIdVO,
  contactLastnameVO,
  ContactMapper,
  contactMessageVO,
  contactNicknameVO,
  contactRequestStatusVO,
} from '../domain';

const item = R.ifElse(
  R.has('id'),
  source =>
    new Contact({
      debts: R.map(
        debt => ({
          amount: contactAmountVO(debt.amount),
          id: contactIdVO(debt.id),
        }),
        source.debts,
      ),
      firstname: contactFirstnameVO(source.firstname),
      id: contactIdVO(source.id),
      lastname: contactLastnameVO(source.lastname),
      nickname: contactNicknameVO(source.nickname),
      requests: R.map(
        request => ({
          fullname: contactFullnameVO({
            firstname: request.firstname,
            lastname: request.lastname,
          }),
          id: contactIdVO(request.id),
          message: contactMessageVO(request.message),
          nickname: contactNicknameVO(request.nickname),
          status: contactRequestStatusVO(request.status),
        }),
        source.requests,
      ),
    }),
  source => {
    throw ContactDomainError.invalidSource(source);
  },
);

export const jsonContactMapper: ContactMapper<object> = {
  item,
  items: R.map(item),
};
