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
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../src/config';
import updateProfileHandler from '../../src/config/command-handler/update-profile.handler';
import { updateProfilePutController } from '../../src/controller';

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
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromEither(right(UserStub)));
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
