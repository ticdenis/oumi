import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
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
import { User, UserQueryRepository } from '../../src/domain';
import { generateUserStub } from '../../src/infrastructure/test/user.stubs';

const test = ava as TestInterface<{
  data: ProfileData;
  repository: {
    query: ObjectSubstitute<UserQueryRepository>;
  };
  user: User;
}>;

test.beforeEach(t => {
  t.context.data = {
    id: UserIdStub.value,
  };
  t.context.repository = {
    query: Substitute.for<UserQueryRepository>(),
  };
  t.context.user = generateUserStub({
    id: UserIdStub,
  });
});

test('should return a profile', async t => {
  // Given
  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.user)));
  const service = profileBuilderService({
    queryRepository: t.context.repository.query,
  });
  const queryHandler = profileHandler(service);
  const query = new ProfileQuery(t.context.data);
  // When
  const response = await queryHandler(query);
  // Then
  t.true(R.includes(response, [profileDataTransformer(t.context.user)]));
});

test('should throw not found error', async t => {
  // Given
  t.context.repository.query.ofId(Arg.any()).returns(fromLeft(null));
  const service = profileBuilderService({
    queryRepository: t.context.repository.query,
  });
  const queryHandler = profileHandler(service);
  const query = new ProfileQuery(t.context.data);
  // When
  const fn = queryHandler(query);
  // Then
  await t.throwsAsync(fn);
});
