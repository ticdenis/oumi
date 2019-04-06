import * as R from 'ramda';

import {
  User,
  UserDomainError,
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  UserMapper,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
} from '../domain';

const item = R.ifElse(
  R.has('id'),
  source =>
    new User({
      email: userEmailVO(source.email),
      firstname: userFirstnameVO(source.firstname),
      id: userIdVO(source.id),
      lastname: userLastnameVO(source.lastname),
      nickname: userNicknameVO(source.nickname),
      password: userPasswordVO(source.password, false) /* Already encripted */,
      phone: userPhoneVO(source.phone),
    }),
  source => {
    throw UserDomainError.invalidSource(source);
  },
);

export const jsonUserMapper: UserMapper<object> = {
  item,
  items: R.map(item),
};
