import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';

import {
  userToken,
  UserTokenData,
  userTokenHandler,
  UserTokenQuery,
} from '../../src/application';
import {
  TokenFactory,
  User,
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
  UserQueryRepository,
} from '../../src/domain';
import { right } from 'fp-ts/lib/Either';

const test = ava as TestInterface<{
  data: UserTokenData;
  factory: ObjectSubstitute<TokenFactory>;
  repository: {
    query: ObjectSubstitute<UserQueryRepository>;
  };
  user: User;
}>;

test.beforeEach(t => {
  t.context.data = {
    email: 'uomi@test.com',
    password: 'secret',
  };
  t.context.factory = Substitute.for<TokenFactory>();
  t.context.repository = {
    query: Substitute.for<UserQueryRepository>(),
  };
  t.context.user = new User({
    email: userEmailVO(t.context.data.email),
    firstname: userFirstnameVO('name'),
    id: userIdVO(),
    lastname: userLastnameVO('surname'),
    nickname: userNicknameVO('nickname'),
    password: userPasswordVO(t.context.data.password),
    phone: userPhoneVO('612345678'),
  });
});

test('should return a valid token', async t => {
  // Given
  t.context.repository.query
    .ofEmail(Arg.any())
    .returns(Promise.resolve(t.context.user));
  t.context.factory.build(Arg.any()).returns(Promise.resolve(right('a-token')));
  const service = userToken({
    queryRepository: t.context.repository.query,
    tokenFactory: t.context.factory,
  });
  const queryHandler = userTokenHandler(service);
  const query = new UserTokenQuery(t.context.data);
  // When
  const response = await queryHandler(query);
  // Then
  t.truthy(response);
});

test('should throw an error finding user because email or password not found', async t => {
  // Given
  t.context.repository.query.ofEmail(Arg.any()).returns(Promise.resolve(null));
  const service = userToken({
    queryRepository: t.context.repository.query,
    tokenFactory: t.context.factory,
  });
  const queryHandler = userTokenHandler(service);
  const query = new UserTokenQuery(t.context.data);
  // When
  const fn = queryHandler(query);
  // Then
  await t.throwsAsync(fn);
});
