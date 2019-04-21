import {
  DomainQueryBus,
  Oumi,
  QueryBus,
  TestDomainError,
} from '@oumi-package/shared/lib/core';
import { UserIdStub } from '@oumi-package/shared/lib/infrastructure/test/user.stubs';
import {
  ProfileData,
  UserId,
  UserQueryRepository,
} from '@oumi-package/user/lib';
import { UserStub } from '@oumi-package/user/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import {
  PROFILE_QUERY,
  PROFILE_QUERY_HANDLER,
  profileGetController,
} from '../../../src/features/profile';

describe('profile GET controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: ProfileData;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    context = {
      app: () =>
        express()
          .use(express.json())
          .get('/test', profileGetController(context.container)),
      container: loadContainer(),
      data: {
        id: UserIdStub.value,
      },
      request: () =>
        supertest(context.app())
          .get('/test')
          .send(context.data),
    };
    context.container.set<UserId>(SERVICE_ID.USER_ID, UserIdStub);
    done();
  });

  test('profile not found', async done => {
    // Given
    context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, {
      ask: () => Promise.reject(new TestDomainError('NOT_FOUND', 'error')),
    });
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.NOT_FOUND);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('profile', async done => {
    // Given
    const queryRepository = Substitute.for<UserQueryRepository>();
    queryRepository.ofId(Arg.any()).returns(fromEither(right(UserStub)));
    const bus = DomainQueryBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, queryRepository);
    bus.addHandler(PROFILE_QUERY, PROFILE_QUERY_HANDLER(context.container));
    context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).not.toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
