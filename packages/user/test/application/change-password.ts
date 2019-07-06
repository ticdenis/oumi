import { EventPublisher } from '@oumi-package/shared/lib/core';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import { UserIdStub } from '../../../shared/lib/infrastructure/test/user.stubs';
import {
  changePasswordBuilderService,
  ChangePasswordCommand,
  ChangePasswordData,
  changePasswordHandler,
} from '../../src/application';
import {
  User,
  UserCommandRepository,
  UserQueryRepository,
} from '../../src/domain';
import { generateUserStub } from '../../src/infrastructure/test/user.stubs';

const helper = {
  command: (data: ChangePasswordData) => new ChangePasswordCommand(data),
  handler: (
    opts: Partial<{
      commandRepository: UserCommandRepository;
      eventPublisher: EventPublisher;
      queryRepository: UserQueryRepository;
    }> = {},
  ) =>
    changePasswordHandler(
      changePasswordBuilderService({
        commandRepository:
          opts.commandRepository || Substitute.for<UserCommandRepository>(),
        eventPublisher: opts.eventPublisher || Substitute.for<EventPublisher>(),
        queryRepository:
          opts.queryRepository || Substitute.for<UserQueryRepository>(),
      }),
    ),
};

const test = ava as TestInterface<{
  data: ChangePasswordData;
  user: User;
}>;

test.beforeEach(t => {
  t.context.data = {
    id: UserIdStub.value,
    newPassword: 'newSecret',
    oldPassword: 'secret',
  };
  t.context.user = generateUserStub({
    id: UserIdStub,
  });
});

test('should throw user not found', async t => {
  // Given
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({
    queryRepository,
  });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw password not match', async t => {
  // Given
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(t.context.user)));
  const handler = helper.handler({
    queryRepository,
  });
  t.context.data.oldPassword = 'error-password';
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should change password', async t => {
  // Given
  const commandRepository = Substitute.for<UserCommandRepository>();
  commandRepository.updatePassword(Arg.any()).returns(Promise.resolve());
  const eventPublisher = Substitute.for<EventPublisher>();
  eventPublisher.publish().returns(Promise.resolve());
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(t.context.user)));
  const handler = helper.handler({
    commandRepository,
    eventPublisher,
    queryRepository,
  });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.notThrowsAsync(fn);
});
