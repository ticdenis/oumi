import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  DEBT_REQUESTS_QUERY,
  DEBT_REQUESTS_QUERY_HANDLER,
  debtRequestsRouter,
} from '../../src/cases/debt-requests';
import {
  Debt,
  DebtDomainError,
  DebtQueryRepository,
  DebtStub,
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
  userEmailVO,
  UserId,
  userPasswordVO,
} from '../helpers/domain-imports';

interface Context {
  debts: Debt[];
  container: Oumi.Container;
  res: supertest.Response;
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

      const queryRepository = Substitute.for<DebtQueryRepository>();
      queryRepository.debtorExists(Arg.any()).returns(Promise.resolve(true));
      queryRepository
        .pendingRequestsOfDebtorId(Arg.any())
        .returns(Promise.resolve(context.debts));

      context.container.set<DebtQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.DEBT,
        queryRepository,
      );

      const queryBus = new DomainQueryBus();
      queryBus.addHandler(
        DEBT_REQUESTS_QUERY,
        DEBT_REQUESTS_QUERY_HANDLER(context.container),
      );

      context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, queryBus);
    },
  );

  when(/^I request GET method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().get(url, debtRequestsRouter(context.container)),
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
          Promise.reject(DebtDomainError.debtorNotFound(context.user.id.value)),
      });
    },
  );

  when(/^I request GET method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().get(url, debtRequestsRouter(context.container)),
    )
      .get(url)
      .set('Authorization', context.token)
      .send();
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );
};

defineFeature(loadFeature('./test/features/debt-requests.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  beforeEach(done => {
    context.user = generateUserStub({
      email: userEmailVO('test@oumi.com'),
      password: userPasswordVO('secret'),
    });

    context.debts = [DebtStub];

    context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

    context.container.set<TokenReader>(
      SERVICE_ID.TOKEN_READER,
      simpleJWTReader('secret'),
    );

    done();
  });

  test('Should get debt requests', step1(context));

  test('Should throw a debt error not found', step2(context));
});
