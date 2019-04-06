import {
  DolarAmountStub,
  EuroAmountStub,
} from '../../../shared/lib/infrastructure/test/amount.stubs';
import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '../../../shared/src/infrastructure/test/user.stubs';
import { ContactDebt } from '../../src/domain';
import { Contact, ContactConstructor } from '../../src/domain/contact';

// tslint:disable-next-line: variable-name
export const EuroContactDebtStub: ContactDebt = {
  amount: EuroAmountStub,
  id: UserIdStub,
};

export const generateEuroContactDebtStub = (
  args: Partial<ContactDebt> = {},
): ContactDebt => ({
  amount: args.amount || EuroAmountStub,
  id: args.id || UserIdStub,
});

export const generateDolarContactDebtStub = (
  args: Partial<ContactDebt> = {},
): ContactDebt => ({
  amount: args.amount || DolarAmountStub,
  id: args.id || UserIdStub,
});

// tslint:disable-next-line: variable-name
export const ContactStub = new Contact({
  debts: [generateEuroContactDebtStub(), generateDolarContactDebtStub()],
  firstname: UserFirstnameStub,
  id: UserIdStub,
  lastname: UserLastnameStub,
  nickname: UserNicknameStub,
});

export const generateContactStub = (args: Partial<ContactConstructor> = {}) =>
  new Contact({
    debts: args.debts || [
      generateEuroContactDebtStub(),
      generateDolarContactDebtStub(),
    ],
    firstname: args.firstname || UserFirstnameStub,
    id: args.id || UserIdStub,
    lastname: args.lastname || UserLastnameStub,
    nickname: args.nickname || UserNicknameStub,
  });
