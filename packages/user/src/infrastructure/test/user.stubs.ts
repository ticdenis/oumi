import { stringVO } from '@oumi-package/shared/lib/core';

import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '../../../../shared/lib/infrastructure/test/user.stubs';
import { User, UserConstructor } from '../../domain/user';
import {
  userEmailVO,
  userPasswordVO,
  userPhoneVO,
} from '../../domain/user.props';

// tslint:disable-next-line: variable-name
export const UserEmailStub = userEmailVO('test@oumi.com');

// tslint:disable-next-line: variable-name
export const UserPasswordStub = userPasswordVO('secret');

// tslint:disable-next-line: variable-name
export const UserPasswordNotEncryptedStub = stringVO('secret');

// tslint:disable-next-line: variable-name
export const UserPhoneStub = userPhoneVO('612345678');

// tslint:disable-next-line: variable-name
export const UserStub = new User({
  email: UserEmailStub,
  firstname: UserFirstnameStub,
  id: UserIdStub,
  lastname: UserLastnameStub,
  nickname: UserNicknameStub,
  password: UserPasswordStub,
  phone: UserPhoneStub,
});

export const generateUserStub = (args: Partial<UserConstructor> = {}) =>
  new User({
    email: args.email || UserStub.email,
    firstname: args.firstname || UserStub.firstname,
    id: args.id || UserStub.id,
    lastname: args.lastname || UserStub.lastname,
    nickname: args.nickname || UserStub.nickname,
    password: args.password || UserStub.password,
    phone: args.phone || UserStub.phone,
  });
