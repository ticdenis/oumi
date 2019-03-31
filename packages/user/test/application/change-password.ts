import { EventPublisher } from '@oumi-package/core';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  changePasswordBuilderService,
  ChangePasswordCommand,
  ChangePasswordData,
  changePasswordHandler,
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
  data: ChangePasswordData;
  eventPublisher: ObjectSubstitute<EventPublisher>;
  repository: {
    command: ObjectSubstitute<UserCommandRepository>;
    query: ObjectSubstitute<UserQueryRepository>;
  };
  user: User;
}>;

test.beforeEach(t => {
  t.context.data = {
    id: userIdVO().value,
    newPassword: 'newSecret',
    oldPassword: 'secret',
  };
  t.context.eventPublisher = Substitute.for<EventPublisher>();
  t.context.repository = {
    command: Substitute.for<UserCommandRepository>(),
    query: Substitute.for<UserQueryRepository>(),
  };
  t.context.user = new User({
    email: userEmailVO('oumi@test.com'),
    firstname: userFirstnameVO('name'),
    id: userIdVO(t.context.data.id),
    lastname: userLastnameVO('surname'),
    nickname: userNicknameVO('nickname'),
    password: userPasswordVO('secret'),
    phone: userPhoneVO('612345678'),
  });
});

test('should throw user not found', async t => {
  // Given
  t.context.repository.query.ofId(Arg.any()).returns(fromLeft(null));
  const service = changePasswordBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = changePasswordHandler(service);
  const command = new ChangePasswordCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw password not match', async t => {
  // Given
  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.user)));
  t.context.data.oldPassword = 'error-password';
  const service = changePasswordBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = changePasswordHandler(service);
  const command = new ChangePasswordCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should change password', async t => {
  // Given
  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.user)));
  t.context.repository.command
    .updatePassword(Arg.any())
    .returns(Promise.resolve());
  t.context.eventPublisher.publish().returns(Promise.resolve());
  const service = changePasswordBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = changePasswordHandler(service);
  const command = new ChangePasswordCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.notThrowsAsync(fn);
});
