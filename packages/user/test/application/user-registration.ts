import { EventPublisher } from '@oumi-package/core/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '../../../shared/src/infrastructure/test/user.stubs';
import {
  userRegistrationBuilderService,
  UserRegistrationCommand,
  UserRegistrationData,
  userRegistrationHandler,
} from '../../src/application/user-registration';
import {
  User,
  UserCommandRepository,
  UserQueryRepository,
} from '../../src/domain';
import {
  UserEmailStub,
  UserPasswordStub,
  UserPhoneStub,
  UserStub,
} from '../../src/infrastructure/test/user.stubs';

const test = ava as TestInterface<{
  data: UserRegistrationData;
  eventPublisher: ObjectSubstitute<EventPublisher>;
  repository: {
    command: ObjectSubstitute<UserCommandRepository>;
    query: ObjectSubstitute<UserQueryRepository>;
  };
}>;

test.beforeEach(t => {
  t.context.data = {
    email: UserEmailStub.value,
    firstname: UserFirstnameStub.value,
    id: UserIdStub.value,
    lastname: UserLastnameStub.value,
    nickname: UserNicknameStub.value,
    password: UserPasswordStub.value,
    phone: UserPhoneStub.value,
  };
  t.context.eventPublisher = Substitute.for<EventPublisher>();
  t.context.repository = {
    command: Substitute.for<UserCommandRepository>(),
    query: Substitute.for<UserQueryRepository>(),
  };
});

test('should register an user', async t => {
  // Given
  t.context.repository.query.ofEmail(Arg.any()).returns(fromLeft(null));
  const service = userRegistrationBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = userRegistrationHandler(service);
  const command = new UserRegistrationCommand(t.context.data);
  // When
  await commandHandler(command);
  // Then
  t.context.repository.command.received(1).create(
    Arg.is(arg => {
      const actual = arg instanceof User;
      t.true(actual);
      return actual;
    }),
  );
});

test('should throw an error registering an user because email already exists', async t => {
  // Given
  t.context.repository.query
    .ofEmail(Arg.any())
    .returns(fromEither(right(UserStub)));
  const service = userRegistrationBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = userRegistrationHandler(service);
  const command = new UserRegistrationCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});
