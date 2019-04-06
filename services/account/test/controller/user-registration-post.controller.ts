import {
  CommandBus,
  DomainCommandBus,
  EventPublisher,
  Oumi,
} from '@oumi-package/core/lib';
import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '@oumi-package/shared/lib/infrastructure/test/user.stubs';
import {
  UserCommandRepository,
  UserQueryRepository,
  UserRegistrationData,
} from '@oumi-package/user/lib';
import {
  UserEmailStub,
  UserPasswordNotEncryptedStub,
  UserPhoneStub,
  UserStub,
} from '@oumi-package/user/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../src/config';
import userRegistrationHandler from '../../src/config/command-handler/user-registration.handler';
import { userRegistrationPostController } from '../../src/controller';

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
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofEmail(Arg.any()).returns(fromEither(right(UserStub)));
    const bus = DomainCommandBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    context.container.set(
      SERVICE_ID.COMMAND_REPOSITORY.USER,
      Substitute.for<UserCommandRepository>(),
    );
    context.container.set(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    bus.addHandler(...userRegistrationHandler(context.container));
    context.container.set<CommandBus>(SERVICE_ID.BUS.COMMAND, bus);
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
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofEmail(Arg.any()).returns(fromLeft(null));
    const fakeCommandRepo = Substitute.for<UserCommandRepository>();
    fakeCommandRepo.create(Arg.any()).returns(Promise.resolve());
    const bus = DomainCommandBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    context.container.set(SERVICE_ID.COMMAND_REPOSITORY.USER, fakeCommandRepo);
    context.container.set(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    bus.addHandler(...userRegistrationHandler(context.container));
    context.container.set<CommandBus>(SERVICE_ID.BUS.COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
