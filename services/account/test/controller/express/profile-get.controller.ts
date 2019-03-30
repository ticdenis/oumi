import { DomainQueryBus, Oumi, QueryBus, uuidVO } from '@oumi-package/core/lib';
import {
  ProfileData,
  User,
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import profileHandler from '../../../src/config/query-handler/profile.handler';
import { profileGetController } from '../../../src/controller/express';

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
        id: uuidVO().value,
      },
      request: () =>
        supertest(context.app())
          .get('/test')
          .send(context.data),
    };

    done();
  });

  test('profile not found', async done => {
    // Given
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromLeft(null));
    const bus = DomainQueryBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    bus.addHandler(...profileHandler(context.container));
    context.container.set<QueryBus>(SERVICE_ID.BUS.QUERY, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('profile', async done => {
    // Given
    const user = new User({
      email: userEmailVO('test@oumi.com'),
      firstname: userFirstnameVO('name'),
      id: userIdVO(context.data.id),
      lastname: userLastnameVO('surname'),
      nickname: userNicknameVO('nickname'),
      password: userPasswordVO('secret'),
      phone: userPhoneVO('612345678'),
    });
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofId(Arg.any()).returns(fromEither(right(user)));
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
