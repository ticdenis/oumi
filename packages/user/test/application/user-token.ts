import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  userTokenBuilderService,
  UserTokenData,
  userTokenHandler,
  UserTokenQuery,
} from '../../src/application';
import { TokenFactory, UserQueryRepository } from '../../src/domain';
import { TokenStub } from '../../src/infrastructure/test/token.stubs';
import {
  UserEmailStub,
  UserPasswordNotEncryptedStub,
  UserStub,
} from '../../src/infrastructure/test/user.stubs';

const helper = {
  handler: (
    opts: Partial<{
      queryRepository: UserQueryRepository;
      tokenFactory: TokenFactory;
    }> = {},
  ) =>
    userTokenHandler(
      userTokenBuilderService({
        queryRepository:
          opts.queryRepository || Substitute.for<UserQueryRepository>(),
        tokenFactory: opts.tokenFactory || Substitute.for<TokenFactory>(),
      }),
    ),
  query: (data: UserTokenData) => new UserTokenQuery(data),
};

const test = ava as TestInterface<{
  data: UserTokenData;
}>;

test.beforeEach(t => {
  t.context.data = {
    email: UserEmailStub.value,
    password: UserPasswordNotEncryptedStub.value,
  };
});

test('should return a valid token', async t => {
  // Given
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofEmail(Arg.any()).returns(fromEither(right(UserStub)));
  const tokenFactory = Substitute.for<TokenFactory>();
  tokenFactory.build(Arg.any()).returns(fromEither(right(TokenStub)));
  const handler = helper.handler({
    queryRepository,
    tokenFactory,
  });
  const query = helper.query(t.context.data);
  // When
  const response = await handler(query);
  // Then
  t.is(typeof response, 'string');
});

test('should throw an error finding user because email or password not exists', async t => {
  // Given
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofEmail(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({
    queryRepository,
  });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.throwsAsync(fn);
});
