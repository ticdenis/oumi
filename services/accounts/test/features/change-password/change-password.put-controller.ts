import {
  CommandBus,
  DomainCommandBus,
  EventPublisher,
  Oumi,
  stringVO,
  TestDomainError,
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
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import {
  CHANGE_PASSWORD_COMMAND,
  CHANGE_PASSWORD_COMMAND_HANDLER,
  changePasswordPutController,
} from '../../../src/features/change-password';

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

  test('password not match', async done => {
    // Given
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () => Promise.reject(new TestDomainError('UNKNOWN', 'error')),
    });
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.id);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('password changed', async done => {
    // Given
    const queryRepository = Substitute.for<UserQueryRepository>();
    const commandRepository = Substitute.for<UserCommandRepository>();
    queryRepository.ofId(Arg.any()).returns(fromEither(right(context.user)));
    commandRepository.updatePassword(Arg.any()).returns(Promise.resolve());
    const bus = DomainCommandBus.instance();
    context.container.set<UserQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.USER,
      queryRepository,
    );
    context.container.set<UserCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.USER,
      commandRepository,
    );
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.id);
    context.container.set<EventPublisher>(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    bus.addHandler(
      CHANGE_PASSWORD_COMMAND,
      CHANGE_PASSWORD_COMMAND_HANDLER(context.container),
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
