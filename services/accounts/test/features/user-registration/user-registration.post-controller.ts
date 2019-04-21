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
  UserCommandRepository,
  UserId,
  UserQueryRepository,
  UserRegistrationData,
} from '@oumi-package/user/lib';
import {
  UserEmailStub,
  UserPasswordNotEncryptedStub,
  UserPhoneStub,
} from '@oumi-package/user/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { fromLeft } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import {
  USER_REGISTRATION_COMMAND,
  USER_REGISTRATION_COMMAND_HANDLER,
  userRegistrationPostController,
} from '../../../src/features/user-registration';

describe('user registration POST controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: UserRegistrationData;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    context = {
      app: () =>
        express()
          .use(express.json())
          .post('/test', userRegistrationPostController(context.container)),
      container: loadContainer(),
      data: {
        email: UserEmailStub.value,
        firstname: UserFirstnameStub.value,
        id: UserIdStub.value,
        lastname: UserLastnameStub.value,
        nickname: UserNicknameStub.value,
        password: UserPasswordNotEncryptedStub.value,
        phone: UserPhoneStub.value,
      },
      request: () =>
        supertest(context.app())
          .post('/test')
          .send(context.data),
    };
    done();
  });

  test('user email already exists', async done => {
    // Given
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () => Promise.reject(new TestDomainError('UNKNOWN', 'error')),
    });
    context.container.set<UserId>(SERVICE_ID.USER_ID, UserIdStub);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('register an user', async done => {
    // Given
    const queryRepository = Substitute.for<UserQueryRepository>();
    queryRepository.ofEmail(Arg.any()).returns(fromLeft(null));
    const commandRepository = Substitute.for<UserCommandRepository>();
    commandRepository.create(Arg.any()).returns(Promise.resolve());
    const bus = DomainCommandBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, queryRepository);
    context.container.set(
      SERVICE_ID.COMMAND_REPOSITORY.USER,
      commandRepository,
    );
    context.container.set(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    bus.addHandler(
      USER_REGISTRATION_COMMAND,
      USER_REGISTRATION_COMMAND_HANDLER(context.container),
    );
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
