import { EventPublisher } from '@oumi-package/core';
import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '@oumi-package/shared/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  updateProfileBuilderService,
  UpdateProfileCommand,
  UpdateProfileData,
  updateProfileHandler,
} from '../../src/application';
import {
  UserCommandRepository,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPhoneVO,
  UserQueryRepository,
} from '../../src/domain';
import { generateUserStub, UserPhoneStub } from '../infrastructure/user.stubs';

const test = ava as TestInterface<{
  data: UpdateProfileData;
  eventPublisher: ObjectSubstitute<EventPublisher>;
  repository: {
    command: ObjectSubstitute<UserCommandRepository>;
    query: ObjectSubstitute<UserQueryRepository>;
  };
}>;

test.beforeEach(t => {
  t.context.data = {
    firstname: UserFirstnameStub.value,
    id: UserIdStub.value,
    lastname: UserLastnameStub.value,
    nickname: UserNicknameStub.value,
    phone: UserPhoneStub.value,
  };
  t.context.eventPublisher = Substitute.for<EventPublisher>();
  t.context.repository = {
    command: Substitute.for<UserCommandRepository>(),
    query: Substitute.for<UserQueryRepository>(),
  };
});

test('should throw user not found', async t => {
  // Given
  t.context.repository.query.ofId(Arg.any()).returns(fromLeft(null));
  const service = updateProfileBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = updateProfileHandler(service);
  const command = new UpdateProfileCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should update profile', async t => {
  // Given
  const user = generateUserStub({
    firstname: userFirstnameVO('new-firstname'),
    id: userIdVO(t.context.data.id),
    lastname: userLastnameVO('new-lastname'),
    nickname: userNicknameVO('new-nickname'),
    phone: userPhoneVO('new-phone'),
  });
  t.context.repository.query.ofId(Arg.any()).returns(fromEither(right(user)));
  t.context.repository.command
    .updateProfile(Arg.any())
    .returns(Promise.resolve());
  t.context.eventPublisher.publish().returns();
  const service = updateProfileBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = updateProfileHandler(service);
  const command = new UpdateProfileCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.notThrowsAsync(fn);
});
