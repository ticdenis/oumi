import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import moment from 'moment';
import supertest from 'supertest';

import {
  PROFILE_QUERY,
  PROFILE_QUERY_HANDLER,
  profileRouter,
} from '../../../src/features/profile';
import {
  DomainQueryBus,
  generateUserStub,
  loadContainer,
  Oumi,
  QueryBus,
  SERVICE_ID,
  simpleJWTFactory,
  simpleJWTReader,
  stringVO,
  TokenReader,
  User,
  UserDomainError,
  userEmailVO,
  userFirstnameVO,
  UserId,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
  UserQueryRepository,
} from '../../helpers/domain-imports';

interface Context {
  container: Oumi.Container;
  res: supertest.Response;
  token: string;
  user: User;
}

defineFeature(loadFeature('./test/features/profile/profile.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  beforeEach(done => {
    context.user = generateUserStub({
      email: userEmailVO('test@oumi.com'),
      firstname: userFirstnameVO('Test'),
      id: userIdVO('A2573A06-538D-46EA-B992-BD9AC911ED18'),
      lastname: userLastnameVO('Er'),
      nickname: userNicknameVO('oumi'),
      password: userPasswordVO('secret'),
      phone: userPhoneVO('123456789'),
    });

    context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

    done();
  });

  test('Should get profile', ({ given, when, then, and }) => {
    given(
      /^I authenticated as user "([^"]*)" with password "([^"]*)"$/,
      async (email: string, password: string) => {
        expect(true).toBe(context.user.email.equalsTo(stringVO(email)));

        expect(true).toBe(context.user.password.equalsTo(stringVO(password)));

        await simpleJWTFactory({
          expiration: moment()
            .add(1, 'minutes')
            .unix(),
          issuer: 'oumi',
          secret: 'secret',
        })
          .build(context.user)
          .mapLeft(() => fail('Error generating token'))
          .map(token => (context.token = token))
          .run();

        expect(context.token).toBeTruthy();

        const queryRepository = Substitute.for<UserQueryRepository>();
        queryRepository
          .ofId(Arg.any())
          .returns(fromEither(right(context.user)));

        context.container.set<UserQueryRepository>(
          SERVICE_ID.QUERY_REPOSITORY.USER,
          queryRepository,
        );

        const queryBus = DomainQueryBus.instance();
        queryBus.addHandler(
          PROFILE_QUERY,
          PROFILE_QUERY_HANDLER(context.container),
        );

        context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, queryBus);

        context.container.set<TokenReader>(
          SERVICE_ID.TOKEN_READER,
          simpleJWTReader('secret'),
        );
      },
    );

    when(/^I request GET method at "([^"]*)" url$/, async (url: string) => {
      context.res = await supertest(
        express().get(url, profileRouter(context.container)),
      )
        .get(url)
        .set('Authorization', context.token)
        .send();
    });

    then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
      expect(context.res.status).toBe(+status),
    );

    and('I expect response to match:', (response: string) =>
      expect(context.res.body).toMatchObject(JSON.parse(response)),
    );
  });

  test('Should throw a profile error not found', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^I authenticated as user "([^"]*)" with password "([^"]*)" and id "([^"]*)"$/,
      async (email: string, password: string, id: string) => {
        expect(true).toBe(context.user.email.equalsTo(stringVO(email)));

        expect(true).toBe(context.user.password.equalsTo(stringVO(password)));

        expect(true).toBe(context.user.id.equalsTo(stringVO(id)));

        await simpleJWTFactory({
          expiration: moment()
            .add(1, 'minutes')
            .unix(),
          issuer: 'oumi',
          secret: 'secret',
        })
          .build(context.user)
          .mapLeft(() => fail('Error generating token'))
          .map(token => (context.token = token))
          .run();

        expect(context.token).toBeTruthy();

        context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, {
          ask: () =>
            Promise.reject(UserDomainError.notFound(context.user.id.value)),
        });

        context.container.set<TokenReader>(
          SERVICE_ID.TOKEN_READER,
          simpleJWTReader('secret'),
        );
      },
    );

    when(/^I request GET method at "([^"]*)" url$/, async (url: string) => {
      context.res = await supertest(
        express().get(url, profileRouter(context.container)),
      )
        .get(url)
        .set('Authorization', context.token)
        .send();
    });

    then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
      expect(context.res.status).toBe(+status),
    );

    and('I expect response to match:', (response: string) =>
      expect(context.res.body).toMatchObject(JSON.parse(response)),
    );
  });
});
