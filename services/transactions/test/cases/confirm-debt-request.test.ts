import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  CONFIRM_DEBT_REQUEST_COMMAND,
  CONFIRM_DEBT_REQUEST_COMMAND_HANDLER,
  confirmDebtRequestRouter,
} from '../../src/cases/confirm-debt-request';
import {
  CommandBus,
  Debt,
  DebtCommandRepository,
  DebtDomainError,
  debtIdVO,
  DebtQueryRepository,
  DomainCommandBus,
  EventPublisher,
  generateDebtorStub,
  generateDebtStub,
  generateUserStub,
  loadContainer,
  Oumi,
  SERVICE_ID,
  simpleJWTFactory,
  simpleJWTReader,
  stringVO,
  TokenReader,
  User,
  userEmailVO,
  UserId,
  userIdVO,
  userPasswordVO,
  uuidVO,
} from '../helpers/domain-imports';

interface Context {
  body: any;
  debt: Debt;
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
    /^I authenticated as user "([^"]*)" with password "([^"]*)" and id "([^"]*)"$/,
    async (email: string, password: string, id: string) => {
      expect(true).toBe(context.user.email.equalsTo(stringVO(email)));

      expect(true).toBe(context.user.password.equalsTo(stringVO(password)));

      expect(true).toBe(context.user.id.equalsTo(uuidVO(id)));

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
    },
  );

  when('I set JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    const queryRepository = Substitute.for<DebtQueryRepository>();
    queryRepository.ofId(Arg.any()).returns(fromEither(right(context.debt)));

    context.container.set<DebtQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.DEBT,
      queryRepository,
    );

    const commandRepository = Substitute.for<DebtCommandRepository>();
    commandRepository.confirmDebtRequest(Arg.any()).returns(Promise.resolve());

    context.container.set<DebtCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.DEBT,
      commandRepository,
    );

    const bus = new DomainCommandBus();
    bus.addHandler(
      CONFIRM_DEBT_REQUEST_COMMAND,
      CONFIRM_DEBT_REQUEST_COMMAND_HANDLER(context.container),
    );
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
  });

  when(/^I request PUT method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().put(
        url,
        express.json(),
        confirmDebtRequestRouter(context.container),
      ),
    )
      .put(url)
      .set('Authorization', context.token)
      .send(context.body);
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );
};

const step2 = (context: Context) => ({
  given,
  when,
  then,
  and,
}: StepsDefinitionCallbackOptions) => {
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
    },
  );

  when('I set JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () =>
        Promise.reject(DebtDomainError.debtNotExists(context.body.id)),
    });
  });

  then(/^I request PUT method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().put(
        url,
        express.json(),
        confirmDebtRequestRouter(context.container),
      ),
    )
      .put(url)
      .set('Authorization', context.token)
      .send(context.body);
  });

  and(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );
};

defineFeature(
  loadFeature('./test/features/confirm-debt-request.feature'),
  test => {
    const context: Context = {
      container: loadContainer(),
    } as any;

    beforeEach(done => {
      context.user = generateUserStub({
        email: userEmailVO('test@oumi.com'),
        id: userIdVO('3CAC1A65-040D-4C51-8BD5-8BE04237B3B3'),
        password: userPasswordVO('secret'),
      });

      context.debt = generateDebtStub({
        debtor: generateDebtorStub({
          id: context.user.id,
        }),
        id: debtIdVO('7C90A92A-4EA8-4EB3-86E6-7B52A3722A64'),
      });

      context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

      context.container.set<EventPublisher>(
        SERVICE_ID.EVENT_PUBLISHER,
        Substitute.for<EventPublisher>(),
      );

      context.container.set<TokenReader>(
        SERVICE_ID.TOKEN_READER,
        simpleJWTReader('secret'),
      );

      done();
    });

    test('Should confirm a debt request', step1(context));

    test('Should throw a debt error not found', step2(context));
  },
);
