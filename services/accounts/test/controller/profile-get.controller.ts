import { DomainQueryBus, Oumi, QueryBus } from '@oumi-package/core/lib';
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
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../src/config';
import profileHandler from '../../src/config/query-handler/profile.handler';
import { profileGetController } from '../../src/controller';

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
    done();
  });

  test('should throw not found', async done => {
    // Given
    context.container.set<UserId>(SERVICE_ID.USER_ID, UserIdStub);
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromLeft(null));
    const bus = DomainQueryBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    bus.addHandler(...profileHandler(context.container));
    context.container.set<QueryBus>(SERVICE_ID.BUS.QUERY, bus);
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
    context.container.set<UserId>(SERVICE_ID.USER_ID, UserIdStub);
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromEither(right(UserStub)));
    const bus = DomainQueryBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    bus.addHandler(...profileHandler(context.container));
    context.container.set<QueryBus>(SERVICE_ID.BUS.QUERY, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).not.toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
