import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  USER_TOKEN_QUERY,
  USER_TOKEN_QUERY_HANDLER,
  userTokenRouter,
} from '../../src/cases/user-token';
import {
  DomainQueryBus,
  generateUserStub,
  loadContainer,
  Oumi,
  QueryBus,
  SERVICE_ID,
  simpleJWTFactory,
  simpleJWTReader,
  TokenFactory,
  TokenReader,
  User,
  UserDomainError,
  userEmailVO,
  UserId,
  userPasswordVO,
  UserQueryRepository,
} from '../helpers/domain-imports';

interface Context {
  body: { email: string; password: string };
  container: Oumi.Container;
  res: supertest.Response;
  user: User;
}

const step1 = (context: Context) => ({
  given,
  when,
  then,
  and,
}: StepsDefinitionCallbackOptions) => {
  given('JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    const queryRepository = Substitute.for<UserQueryRepository>();
    queryRepository.ofEmail(Arg.any()).returns(fromEither(right(context.user)));

    context.container.set<UserQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.USER,
      queryRepository,
    );

    const queryBus = DomainQueryBus.instance();
    queryBus.addHandler(
      USER_TOKEN_QUERY,
      USER_TOKEN_QUERY_HANDLER(context.container),
    );

    context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, queryBus);
  });

  when(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(url, express.json(), userTokenRouter(context.container)),
    )
      .post(url)
      .send(context.body);
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );

  and('I expect response to match with a JWT', () =>
    expect(context.res.body.data).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
    ),
  );
};

const step2 = (context: Context) => ({
  given,
  when,
  then,
}: StepsDefinitionCallbackOptions) => {
  given('JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, {
      ask: () =>
        Promise.reject(UserDomainError.notExists(context.user.email.value)),
    });
  });

  when(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(url, express.json(), userTokenRouter(context.container)),
    )
      .post(url)
      .send(context.body);
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );
};

defineFeature(loadFeature('./test/features/user-token.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  beforeEach(done => {
    context.user = generateUserStub({
      email: userEmailVO('test@oumi.com'),
      password: userPasswordVO('secret'),
    });

    context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

    context.container.set<TokenFactory>(
      SERVICE_ID.TOKEN_FACTORY,
      simpleJWTFactory({
        expiration: moment()
          .add(3, 'minutes')
          .unix(),
        issuer: 'oumi',
        secret: 'secret',
      }),
    );

    context.container.set<TokenReader>(
      SERVICE_ID.TOKEN_READER,
      simpleJWTReader('secret'),
    );

    done();
  });

  test('Should authenticate', step1(context));

  test(
    'Should throw a user email not found or password not match error',
    step2(context),
  );
});
