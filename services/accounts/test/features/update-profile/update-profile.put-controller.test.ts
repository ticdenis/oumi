import {
  CommandBus,
  DomainCommandBus,
  EventPublisher,
  Oumi,
  TestDomainError,
} from '@oumi-package/shared/lib/core';
import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '@oumi-package/shared/lib/infrastructure/test/user.stubs';
import {
  UpdateProfileData,
  UserCommandRepository,
  UserId,
  UserQueryRepository,
} from '@oumi-package/user/lib';
import {
  UserPhoneStub,
  UserStub,
} from '@oumi-package/user/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import {
  UPDATE_PROFILE_COMMAND,
  UPDATE_PROFILE_COMMAND_HANDLER,
  updateProfilePutController,
} from '../../../src/features/update-profile';

describe('user registration POST controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: UpdateProfileData;
    id: UserId;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    context = {
      app: () =>
        express()
          .use(express.json())
          .put('/test', updateProfilePutController(context.container)),
      container: loadContainer(),
      data: {
        firstname: UserFirstnameStub.value,
        id: UserIdStub.value,
        lastname: UserLastnameStub.value,
        nickname: UserNicknameStub.value,
        phone: UserPhoneStub.value,
      },
      id: UserIdStub,
      request: () =>
        supertest(context.app())
          .put('/test')
          .send(context.data),
    };
    done();
  });

  test('user not found', async done => {
    // Given
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () => Promise.reject(new TestDomainError('NOT_FOUND', 'error')),
    });
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.id);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.NOT_FOUND);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('profile updated', async done => {
    // Given
    const queryRepository = Substitute.for<UserQueryRepository>();
    queryRepository.ofId(Arg.any()).returns(fromEither(right(UserStub)));
    const commandRepository = Substitute.for<UserCommandRepository>();
    commandRepository.updateProfile(Arg.any()).returns(Promise.resolve());
    const bus = DomainCommandBus.instance();
    context.container.set<UserQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.USER,
      queryRepository,
    );
    context.container.set<UserCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.USER,
      commandRepository,
    );
    context.container.set<EventPublisher>(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.id);
    bus.addHandler(
      UPDATE_PROFILE_COMMAND,
      UPDATE_PROFILE_COMMAND_HANDLER(context.container),
    );
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
