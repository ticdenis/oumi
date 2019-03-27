import {
  CommandBus,
  DomainCommandBus,
  EventPublisher,
  Oumi,
} from '@oumi-package/core/lib';
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
  UserRegistrationData,
} from '@oumi-package/user/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import userRegistrationHandler from '../../../src/config/command-handler/user-registration.handler';
import { userRegistrationPostController } from '../../../src/controller/express';

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
        email: userEmailVO('test@oumi.com').value,
        firstname: userFirstnameVO('firstname').value,
        id: userIdVO().value,
        lastname: userLastnameVO('lastname').value,
        nickname: userNicknameVO('nickname').value,
        password: userPasswordVO('secret').value,
        phone: userPhoneVO('612345678').value,
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
    fakeQueryRepo
      .ofEmail(Arg.any())
      .returns(Promise.resolve(Substitute.for<User>()));
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
    fakeQueryRepo.ofEmail(Arg.any()).returns(Promise.resolve(null));
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
