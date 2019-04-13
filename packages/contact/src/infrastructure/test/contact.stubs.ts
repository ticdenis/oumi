import { NullableStringVO, nullableStringVO } from '@oumi-package/core';
import {
  DolarAmountStub,
  EuroAmountStub,
} from '@oumi-package/shared/lib/infrastructure/test/amount.stubs';
import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '@oumi-package/shared/lib/infrastructure/test/user.stubs';

import {
  Contact,
  ContactConstructor,
  ContactDebt,
  contactFullnameVO,
  ContactRequest,
  contactRequestStatusVO,
} from '../../domain';

// tslint:disable-next-line: variable-name
export const ContactIdStub = UserIdStub;

// tslint:disable-next-line: variable-name
export const ContactNicknameStub = UserNicknameStub;

// tslint:disable-next-line: variable-name
export const EuroContactDebtStub: ContactDebt = {
  amount: EuroAmountStub,
  id: ContactIdStub,
};

// tslint:disable-next-line: variable-name
export const ContactMessageStub: NullableStringVO = nullableStringVO('message');

export const generateEuroContactDebtStub = (
  args: Partial<ContactDebt> = {},
): ContactDebt => ({
  amount: args.amount || EuroAmountStub,
  id: args.id || ContactIdStub,
});

export const generateDolarContactDebtStub = (
  args: Partial<ContactDebt> = {},
): ContactDebt => ({
  amount: args.amount || DolarAmountStub,
  id: args.id || ContactIdStub,
});

export const generateContactRequestStub = (
  args: Partial<ContactRequest> = {},
): ContactRequest => ({
  fullname: args.fullname || ContactFullnameStub,
  id: args.id || ContactIdStub,
  message: args.message !== undefined ? args.message : ContactMessageStub,
  nickname: args.nickname || UserNicknameStub,
  status: args.status || ContactRequestStatusSendedStub,
});

// tslint:disable-next-line: variable-name
export const ContactRequestStatusSendedStub = contactRequestStatusVO('SENDED');

// tslint:disable-next-line: variable-name
export const ContactFullnameStub = contactFullnameVO({
  firstname: 'firstname',
  lastname: 'lastname',
});

// tslint:disable-next-line: variable-name
export const ContactRequestStatusPendingStub = contactRequestStatusVO(
  'PENDING',
);
// tslint:disable-next-line: variable-name
export const ContactRequestStatusAcceptedStub = contactRequestStatusVO(
  'ACCEPTED',
);
// tslint:disable-next-line: variable-name
export const ContactRequestStatusRefusedStub = contactRequestStatusVO(
  'REFUSED',
);

// tslint:disable-next-line: variable-name
export const ContactStub = new Contact({
  debts: [generateEuroContactDebtStub(), generateDolarContactDebtStub()],
  firstname: UserFirstnameStub,
  id: ContactIdStub,
  lastname: UserLastnameStub,
  nickname: UserNicknameStub,
  requests: [generateContactRequestStub()],
});

export const generateContactStub = (args: Partial<ContactConstructor> = {}) =>
  new Contact({
    debts: args.debts || [
      generateEuroContactDebtStub(),
      generateDolarContactDebtStub(),
    ],
    firstname: args.firstname || UserFirstnameStub,
    id: args.id || ContactIdStub,
    lastname: args.lastname || UserLastnameStub,
    nickname: args.nickname || UserNicknameStub,
    requests: args.requests || [generateContactRequestStub()],
  });
