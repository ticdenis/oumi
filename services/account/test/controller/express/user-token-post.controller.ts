import {
  DomainQueryBus,
  Oumi,
  QueryBus,
  stringVO,
} from '@oumi-package/core/lib';
import {
  TokenFactory,
  User,
  userEmailVO,
  userPasswordVO,
  UserQueryRepository,
  UserTokenData,
} from '@oumi-package/user/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import userTokenHandler from '../../../src/config/query-handler/user-token.handler';
import { userTokenPostController } from '../../../src/controller/express';

describe('user token POST controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: UserTokenData;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    context = {
      app: () =>
        express()
          .use(express.json())
          .post('/test', userTokenPostController(context.container)),
      container: loadContainer(),
      data: {
        email: stringVO('test@oumi.com').value,
        password: stringVO('secret').value,
      },
      request: () =>
        supertest(context.app())
          .post('/test')
          .send(context.data),
    };

    done();
  });

  test('user email not exists', async done => {
    // Given
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofEmail(Arg.any()).returns(fromLeft(null));
    const bus = DomainQueryBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    context.container.set(
      SERVICE_ID.TOKEN_FACTORY,
      Substitute.for<TokenFactory>(),
    );
    bus.addHandler(...userTokenHandler(context.container));
    context.container.set<QueryBus>(SERVICE_ID.BUS.QUERY, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('user password not match', async done => {
    // Given
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofEmail(Arg.any()).returns(
      fromEither(
        right({
          password: userPasswordVO('another-password'),
        } as any),
      ),
    );
    const bus = DomainQueryBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    context.container.set(
      SERVICE_ID.TOKEN_FACTORY,
      Substitute.for<TokenFactory>(),
    );
    bus.addHandler(...userTokenHandler(context.container));
    context.container.set<QueryBus>(SERVICE_ID.BUS.QUERY, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('user token', async done => {
    // Given
    const user: User = {
      email: userEmailVO('test@oumi.com'),
      password: userPasswordVO('secret'),
    } as any;
    const fakeQueryRepo = Substitute.for<UserQueryRepository>();
    fakeQueryRepo.ofEmail(Arg.any()).returns(fromEither(right(user)));
    const bus = DomainQueryBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.USER, fakeQueryRepo);
    const fakeTokenFactory: TokenFactory = {
      build: _ => fromEither(right('token')),
    };
    context.container.set(SERVICE_ID.TOKEN_FACTORY, fakeTokenFactory);
    bus.addHandler(...userTokenHandler(context.container));
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
