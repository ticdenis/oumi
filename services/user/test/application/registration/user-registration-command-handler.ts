import ava, { TestInterface } from 'ava';
import {
  userRegistration,
  userRegistrationCommand,
  userRegistrationCommandHandler,
  UserRegistrationInput,
} from '../../../src/application/registration';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import {
  UserCommandRepository,
  UserQueryRepository,
} from '../../../src/domain/repository';
import { userIdVO } from '../../../src/domain/value-object';
import { User } from '../../../src/domain';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';

const test = ava as TestInterface<{
  input: UserRegistrationInput;
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
    password: 'secret',
  };
  t.context.repository = {
    command: Substitute.for<UserCommandRepository>(),
    query: Substitute.for<UserQueryRepository>(),
  };
});

test('should register an user', async t => {
  // Given
  t.context.repository.query.ofEmail(Arg.any()).returns(Promise.resolve(null));
  const service = userRegistration(
    t.context.repository.query,
    t.context.repository.command,
  );
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
    .returns(Promise.resolve({} as User));
  const service = userRegistration(
    t.context.repository.query,
    t.context.repository.command,
  );
  const commandHandler = userRegistrationCommandHandler(service);
  const command = userRegistrationCommand(t.context.input);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});
