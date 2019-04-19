import {
  CommandBus,
  DomainCommandBus,
  EventPublisher,
  Oumi,
  stringVO,
} from '@oumi-package/shared/lib/core';
import { UserIdStub } from '@oumi-package/shared/lib/infrastructure/test/user.stubs';
import {
  ChangePasswordData,
  User,
  UserCommandRepository,
  UserId,
  UserQueryRepository,
} from '@oumi-package/user/lib';
import {
  UserPasswordNotEncryptedStub,
  UserStub,
} from '@oumi-package/user/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../src/config';
import changePasswordHandler from '../../src/config/command-handler/change-password.handler';
import { changePasswordPutController } from '../../src/controller';

describe('change password PUT controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: ChangePasswordData;
    id: UserId;
    request: () => supertest.Test;
    user: User;
  };

  beforeEach(done => {
    context = {
      app: () =>
        express()
          .use(express.json())
          .put('/test', changePasswordPutController(context.container)),
      container: loadContainer(),
      data: {
        id: UserIdStub.value,
        newPassword: stringVO('new-password').value,
        oldPassword: UserPasswordNotEncryptedStub.value,
      },
      id: UserIdStub,
      request: () =>
        supertest(context.app())
          .put('/test')
          .send(context.data),
      user: UserStub,
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
    bus.addHandler(...changePasswordHandler(context.container));
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.NOT_FOUND);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('password not match', async done => {
    // Given
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromEither(right(context.user)));
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
    context.data.oldPassword = stringVO('password-error').value;
    bus.addHandler(...changePasswordHandler(context.container));
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('should be password change', async done => {
    // Given
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    const fakeCommandRepository = Substitute.for<UserCommandRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromEither(right(context.user)));
    fakeCommandRepository.updatePassword(Arg.any()).returns(Promise.resolve());
    const bus = DomainCommandBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    context.container.set(
      SERVICE_ID.COMMAND_REPOSITORY.USER,
      fakeCommandRepository,
    );
    context.container.set(SERVICE_ID.USER_ID, context.id);
    context.container.set(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    bus.addHandler(...changePasswordHandler(context.container));
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
