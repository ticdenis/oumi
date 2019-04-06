import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  userTokenBuilderService,
  UserTokenData,
  userTokenHandler,
  UserTokenQuery,
} from '../../src/application';
import { TokenFactory, User, UserQueryRepository } from '../../src/domain';
import { TokenStub } from '../../src/infrastructure/test/token.stubs';
import {
  UserEmailStub,
  UserPasswordNotEncryptedStub,
  UserStub,
} from '../../src/infrastructure/test/user.stubs';

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
    email: UserEmailStub.value,
    password: UserPasswordNotEncryptedStub.value,
  };
  t.context.factory = Substitute.for<TokenFactory>();
  t.context.repository = {
    query: Substitute.for<UserQueryRepository>(),
  };
  t.context.user = UserStub;
});

test('should return a valid token', async t => {
  // Given
  t.context.repository.query
    .ofEmail(Arg.any())
    .returns(fromEither(right(t.context.user)));
  t.context.factory.build(Arg.any()).returns(fromEither(right(TokenStub)));
  const service = userTokenBuilderService({
    queryRepository: t.context.repository.query,
    tokenFactory: t.context.factory,
  });
  const queryHandler = userTokenHandler(service);
  const query = new UserTokenQuery(t.context.data);
  // When
  const response = await queryHandler(query);
  // Then
  t.is(typeof response, 'string');
});

test('should throw an error finding user because email or password not exists', async t => {
  // Given
  t.context.repository.query.ofEmail(Arg.any()).returns(fromLeft(null));
  const service = userTokenBuilderService({
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
