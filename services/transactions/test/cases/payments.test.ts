import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  PAYMENTS_QUERY,
  PAYMENTS_QUERY_HANDLER,
  paymentsRouter,
} from '../../src/cases/payments';
import {
  DomainQueryBus,
  generateUserStub,
  loadContainer,
  Oumi,
  Payment,
  PaymentDomainError,
  PaymentQueryRepository,
  PaymentStub,
  QueryBus,
  SERVICE_ID,
  simpleJWTFactory,
  simpleJWTReader,
  stringVO,
  TokenReader,
  User,
  userEmailVO,
  UserId,
  userPasswordVO,
} from '../helpers/domain-imports';

interface Context {
  container: Oumi.Container;
  res: supertest.Response;
  payments: Payment[];
  token: string;
  user: User;
}

const step1 = (context: Context) => ({
  given,
  when,
  then,
}: StepsDefinitionCallbackOptions) => {
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

      const queryRepository = Substitute.for<PaymentQueryRepository>();
      queryRepository
        .allOfId(Arg.any())
        .returns(fromEither(right(context.payments)));

      context.container.set<PaymentQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.PAYMENT,
        queryRepository,
      );

      const queryBus = new DomainQueryBus();
      queryBus.addHandler(
        PAYMENTS_QUERY,
        PAYMENTS_QUERY_HANDLER(context.container),
      );

      context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, queryBus);
    },
  );

  when(/^I request GET method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().get(url, paymentsRouter(context.container)),
    )
      .get(url)
      .set('Authorization', context.token)
      .send();
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );
};

const step2 = (context: Context) => ({
  given,
  when,
  then,
}: StepsDefinitionCallbackOptions) => {
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

      context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, {
        ask: () =>
          Promise.reject(
            PaymentDomainError.debtNotFound(context.user.id.value),
          ),
      });
    },
  );

  when(/^I request GET method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().get(url, paymentsRouter(context.container)),
    )
      .get(url)
      .set('Authorization', context.token)
      .send();
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );
};

defineFeature(loadFeature('./test/features/payments.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  beforeEach(done => {
    context.user = generateUserStub({
      email: userEmailVO('test@oumi.com'),
      password: userPasswordVO('secret'),
    });

    context.payments = [PaymentStub];

    context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

    context.container.set<TokenReader>(
      SERVICE_ID.TOKEN_READER,
      simpleJWTReader('secret'),
    );

    done();
  });

  test('Should get my payments', step1(context));

  test('Should throw a user error not found', step2(context));
});
