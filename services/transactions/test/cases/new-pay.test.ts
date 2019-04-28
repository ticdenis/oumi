import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  NEW_PAY_COMMAND,
  NEW_PAY_COMMAND_HANDLER,
  newPayRouter,
} from '../../src/cases/new-pay';
import {
  CommandBus,
  DomainCommandBus,
  EventPublisher,
  generatePaymentDebtStub,
  generateUserStub,
  loadContainer,
  Oumi,
  PaymentCommandRepository,
  PaymentDebt,
  paymentDebtIdVO,
  PaymentDomainError,
  paymentQuantityVO,
  PaymentQueryRepository,
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
} from '../helpers/domain-imports';

interface Context {
  body: any;
  container: Oumi.Container;
  res: supertest.Response;
  paymentDebt: PaymentDebt;
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
    },
  );

  when('I set JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    const queryRepository = Substitute.for<PaymentQueryRepository>();
    queryRepository
      .ofDebtId(Arg.any())
      .returns(fromEither(right(context.paymentDebt)));

    context.container.set<PaymentQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.PAYMENT,
      queryRepository,
    );

    const commandRepository = Substitute.for<PaymentCommandRepository>();
    commandRepository.create(Arg.any()).returns(Promise.resolve());

    context.container.set<PaymentCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.PAYMENT,
      commandRepository,
    );

    const bus = DomainCommandBus.instance();
    bus.addHandler(NEW_PAY_COMMAND, NEW_PAY_COMMAND_HANDLER(context.container));
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
  });

  when(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(url, express.json(), newPayRouter(context.container)),
    )
      .post(url)
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
    },
  );

  when('I set JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () =>
        Promise.reject(PaymentDomainError.debtNotFound(context.body.debtId)),
    });
  });

  then(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(url, express.json(), newPayRouter(context.container)),
    )
      .post(url)
      .set('Authorization', context.token)
      .send(context.body);
  });

  and(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );
};

defineFeature(loadFeature('./test/features/new-pay.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  beforeEach(done => {
    context.user = generateUserStub({
      email: userEmailVO('test@oumi.com'),
      id: userIdVO('AC9A3554-9EEB-4450-A1BE-22D8ABA32B47'),
      password: userPasswordVO('secret'),
    });

    context.paymentDebt = generatePaymentDebtStub({
      id: paymentDebtIdVO('496E0C23-ED63-4725-B391-DE908C5ECF65'),
      quantity: paymentQuantityVO(100),
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

  test('Should send a new pay', step1(context));

  test('Should throw a user error not found', step2(context));
});
