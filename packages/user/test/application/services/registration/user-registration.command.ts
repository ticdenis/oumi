import { EventPublisher } from '@oumi-package/core';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';

import {
  userRegistration,
  userRegistrationCommand,
  userRegistrationCommandHandler,
  UserRegistrationInput,
} from '../../../../src/application/services/registration';
import {
  User,
  UserCommandRepository,
  userIdVO,
  UserQueryRepository,
} from '../../../../src/domain';

const test = ava as TestInterface<{
  input: UserRegistrationInput;
  eventPublisher: ObjectSubstitute<EventPublisher>;
  repository: {
    command: ObjectSubstitute<UserCommandRepository>;
    query: ObjectSubstitute<UserQueryRepository>;
  };
}>;

test.beforeEach(t => {
  t.context.input = {
    email: 'uomi@test.com',
    firstname: 'name',
    id: userIdVO().value,
    lastname: 'surname',
    nickname: 'nickname',
    password: 'secret',
    phone: '612345678',
  };
  t.context.eventPublisher = Substitute.for<EventPublisher>();
  t.context.repository = {
    command: Substitute.for<UserCommandRepository>(),
    query: Substitute.for<UserQueryRepository>(),
  };
});

test('should register an user', async t => {
  // Given
  t.context.repository.query.ofEmail(Arg.any()).returns(Promise.resolve(null));
  const service = userRegistration({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = userRegistrationCommandHandler(service);
  const command = userRegistrationCommand(t.context.input);
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
    .returns(Promise.resolve({} as any));
  const service = userRegistration({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = userRegistrationCommandHandler(service);
  const command = userRegistrationCommand(t.context.input);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});
