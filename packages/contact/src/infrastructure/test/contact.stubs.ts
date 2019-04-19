import {
  NullableStringVO,
  nullableStringVO,
} from '@oumi-package/shared/lib/core';
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
  CONTACT_REQUEST_CONFIRMED_STATUS,
  CONTACT_REQUEST_PENDING_STATUS,
  CONTACT_REQUEST_REFUSED_STATUS,
  CONTACT_REQUEST_SENDED_STATUS,
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
export const ContactLastnameStub = UserLastnameStub;

// tslint:disable-next-line: variable-name
export const ContactFirstnameStub = UserFirstnameStub;

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
  nickname: args.nickname || ContactNicknameStub,
  status: args.status || ContactRequestStatusSendedStub,
});

// tslint:disable-next-line: variable-name
export const ContactFullnameStub = contactFullnameVO({
  firstname: 'firstname',
  lastname: 'lastname',
});

// tslint:disable-next-line: variable-name
export const ContactRequestStatusSendedStub = contactRequestStatusVO(
  CONTACT_REQUEST_SENDED_STATUS,
);

// tslint:disable-next-line: variable-name
export const ContactRequestStatusPendingStub = contactRequestStatusVO(
  CONTACT_REQUEST_PENDING_STATUS,
);
// tslint:disable-next-line: variable-name
export const ContactRequestStatusConfirmedStub = contactRequestStatusVO(
  CONTACT_REQUEST_CONFIRMED_STATUS,
);
// tslint:disable-next-line: variable-name
export const ContactRequestStatusRefusedStub = contactRequestStatusVO(
  CONTACT_REQUEST_REFUSED_STATUS,
);

// tslint:disable-next-line: variable-name
export const ContactStub = new Contact({
  debts: [generateEuroContactDebtStub(), generateDolarContactDebtStub()],
  firstname: ContactNicknameStub,
  id: ContactIdStub,
  lastname: ContactLastnameStub,
  nickname: ContactNicknameStub,
  requests: [generateContactRequestStub()],
});

export const generateContactStub = (args: Partial<ContactConstructor> = {}) =>
  new Contact({
    debts: args.debts || [
      generateEuroContactDebtStub(),
      generateDolarContactDebtStub(),
    ],
    firstname: args.firstname || ContactFirstnameStub,
    id: args.id || ContactIdStub,
    lastname: args.lastname || ContactLastnameStub,
    nickname: args.nickname || ContactNicknameStub,
    requests: args.requests || [generateContactRequestStub()],
  });
