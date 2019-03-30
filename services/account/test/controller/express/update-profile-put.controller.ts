import {
  CommandBus,
  DomainCommandBus,
  EventPublisher,
  Oumi,
} from '@oumi-package/core/lib';
import {
  UpdateProfileData,
  UserCommandRepository,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPhoneVO,
  UserQueryRepository,
  UserId,
  User,
  userEmailVO,
  userPasswordVO,
} from '@oumi-package/user/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { fromLeft, fromEither } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import updateProfileHandler from '../../../src/config/command-handler/update-profile.handler';
import { updateProfilePutController } from '../../../src/controller/express';
import { right } from 'fp-ts/lib/Either';

describe('user registration POST controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: UpdateProfileData;
    id: UserId;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    const id = userIdVO();
    context = {
      app: () =>
        express()
          .use(express.json())
          .put('/test', updateProfilePutController(context.container)),
      container: loadContainer(),
      data: {
        firstname: userFirstnameVO('firstname').value,
        id: id.value,
        lastname: userLastnameVO('lastname').value,
        nickname: userNicknameVO('nickname').value,
        phone: userPhoneVO('612345678').value,
      },
      id,
      request: () =>
        supertest(context.app())
          .put('/test')
          .send(context.data),
    };

    done();
  });

  test('user not found', async done => {
    // Given
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromLeft(null));
    const bus = DomainCommandBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    context.container.set(
      SERVICE_ID.COMMAND_REPOSITORY.USER,
      Substitute.for<UserCommandRepository>(),
    );
    context.container.set(SERVICE_ID.USER_ID, context.id);
    context.container.set(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    bus.addHandler(...updateProfileHandler(context.container));
    context.container.set<CommandBus>(SERVICE_ID.BUS.COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('update profile', async done => {
    // Given
    const user = new User({
      email: userEmailVO('oumi@test.com'),
      firstname: userFirstnameVO('name'),
      id: context.id,
      lastname: userLastnameVO('surname'),
      nickname: userNicknameVO('nickname'),
      password: userPasswordVO('secret'),
      phone: userPhoneVO('612345678'),
    })
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromEither(right(user)));
    const fakeCommandRepo = Substitute.for<UserCommandRepository>();
    fakeCommandRepo.updateProfile(Arg.any()).returns(Promise.resolve());
    const bus = DomainCommandBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    context.container.set(SERVICE_ID.COMMAND_REPOSITORY.USER, fakeCommandRepo);
    context.container.set(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    context.container.set(SERVICE_ID.USER_ID, context.id);
    bus.addHandler(...updateProfileHandler(context.container));
    context.container.set<CommandBus>(SERVICE_ID.BUS.COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
