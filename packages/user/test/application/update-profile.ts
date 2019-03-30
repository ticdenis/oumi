import { EventPublisher } from '@oumi-package/core';

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
  User,
  UserCommandRepository,
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
  UserQueryRepository,
} from '../../src/domain';

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
    firstname: 'name',
    id: userIdVO().value,
    lastname: 'surname',
    nickname: 'nickname',
    phone: '612345678',
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
  const user = new User({
    email: userEmailVO('oumi@test.com'),
    firstname: userFirstnameVO('name'),
    id: userIdVO(t.context.data.id),
    lastname: userLastnameVO('surname'),
    nickname: userNicknameVO('nickname'),
    password: userPasswordVO('secret'),
    phone: userPhoneVO('612345678'),
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
