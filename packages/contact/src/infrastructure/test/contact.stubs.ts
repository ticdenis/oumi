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

export const ContactIdStub = UserIdStub;

export const ContactNicknameStub = UserNicknameStub;

export const ContactLastnameStub = UserLastnameStub;

export const ContactFirstnameStub = UserFirstnameStub;

export const EuroContactDebtStub: ContactDebt = {
  amount: EuroAmountStub,
  id: ContactIdStub,
};

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

export const ContactFullnameStub = contactFullnameVO({
  firstname: 'firstname',
  lastname: 'lastname',
});

export const ContactRequestStatusSendedStub = contactRequestStatusVO(
  CONTACT_REQUEST_SENDED_STATUS,
);

export const ContactRequestStatusPendingStub = contactRequestStatusVO(
  CONTACT_REQUEST_PENDING_STATUS,
);

export const ContactRequestStatusConfirmedStub = contactRequestStatusVO(
  CONTACT_REQUEST_CONFIRMED_STATUS,
);

export const ContactRequestStatusRefusedStub = contactRequestStatusVO(
  CONTACT_REQUEST_REFUSED_STATUS,
);

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
