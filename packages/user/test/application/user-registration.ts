import { EventPublisher } from '@oumi-package/core/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
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

const helper = {
  command: (data: UserRegistrationData) => new UserRegistrationCommand(data),
  handler: (
    opts: Partial<{
      commandRepository: UserCommandRepository;
      eventPublisher: EventPublisher;
      queryRepository: UserQueryRepository;
    }> = {},
  ) =>
    userRegistrationHandler(
      userRegistrationBuilderService({
        commandRepository:
          opts.commandRepository || Substitute.for<UserCommandRepository>(),
        eventPublisher: opts.eventPublisher || Substitute.for<EventPublisher>(),
        queryRepository:
          opts.queryRepository || Substitute.for<UserQueryRepository>(),
      }),
    ),
};

const test = ava as TestInterface<{
  data: UserRegistrationData;
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
});

test('should register an user', async t => {
  // Given
  const commandRepository = Substitute.for<UserCommandRepository>();
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofEmail(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({ commandRepository, queryRepository });
  const command = helper.command(t.context.data);
  // When
  await handler(command);
  // Then
  commandRepository.received(1).create(
    Arg.is(arg => {
      const actual = arg instanceof User;
      t.true(actual);
      return actual;
    }),
  );
});

test('should throw an error registering an user because email already exists', async t => {
  // Given
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofEmail(Arg.any()).returns(fromEither(right(UserStub)));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});
