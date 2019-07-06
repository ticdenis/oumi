import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as R from 'ramda';

import { UserIdStub } from '../../../shared/lib/infrastructure/test/user.stubs';
import {
  profileBuilderService,
  ProfileData,
  profileDataTransformer,
  profileHandler,
  ProfileQuery,
} from '../../src/application';
import { UserQueryRepository } from '../../src/domain';
import { generateUserStub } from '../../src/infrastructure/test/user.stubs';

const helper = {
  handler: (
    opts: Partial<{
      queryRepository: UserQueryRepository;
    }> = {},
  ) =>
    profileHandler(
      profileBuilderService({
        queryRepository:
          opts.queryRepository || Substitute.for<UserQueryRepository>(),
      }),
    ),
  query: (data: ProfileData) => new ProfileQuery(data),
};

const test = ava as TestInterface<{
  data: ProfileData;
}>;

test.beforeEach(t => {
  t.context.data = {
    id: UserIdStub.value,
  };
});

test('should return a profile', async t => {
  // Given
  const user = generateUserStub({
    id: UserIdStub,
  });
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(user)));
  const handler = helper.handler({ queryRepository });
  const query = helper.query(t.context.data);
  // When
  const response = await handler(query);
  // Then
  t.true(R.includes(response, [profileDataTransformer(user)]));
});

test('should throw not found error', async t => {
  // Given
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({ queryRepository });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.throwsAsync(fn);
});
