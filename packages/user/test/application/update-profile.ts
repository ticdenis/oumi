import { EventPublisher } from '@oumi-package/shared/lib/core';
import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '@oumi-package/shared/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
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
import {
  generateUserStub,
  UserPhoneStub,
} from '../../src/infrastructure/test/user.stubs';

const helper = {
  command: (data: UpdateProfileData) => new UpdateProfileCommand(data),
  handler: (
    opts: Partial<{
      commandRepository: UserCommandRepository;
      eventPublisher: EventPublisher;
      queryRepository: UserQueryRepository;
    }> = {},
  ) =>
    updateProfileHandler(
      updateProfileBuilderService({
        commandRepository:
          opts.commandRepository || Substitute.for<UserCommandRepository>(),
        eventPublisher: opts.eventPublisher || Substitute.for<EventPublisher>(),
        queryRepository:
          opts.queryRepository || Substitute.for<UserQueryRepository>(),
      }),
    ),
};

const test = ava as TestInterface<{
  data: UpdateProfileData;
}>;

test.beforeEach(t => {
  t.context.data = {
    firstname: UserFirstnameStub.value,
    id: UserIdStub.value,
    lastname: UserLastnameStub.value,
    nickname: UserNicknameStub.value,
    phone: UserPhoneStub.value,
  };
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

test('should update profile', async t => {
  // Given
  const user = generateUserStub({
    firstname: userFirstnameVO('new-firstname'),
    id: userIdVO(t.context.data.id),
    lastname: userLastnameVO('new-lastname'),
    nickname: userNicknameVO('new-nickname'),
    phone: userPhoneVO('new-phone'),
  });
  const commandRepository = Substitute.for<UserCommandRepository>();
  commandRepository.updateProfile(Arg.any()).returns(Promise.resolve());
  const eventPublisher = Substitute.for<EventPublisher>();
  eventPublisher.publish().returns();
  const queryRepository = Substitute.for<UserQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(user)));
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
