import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  NEW_DEBT_REQUEST_COMMAND,
  NEW_DEBT_REQUEST_COMMAND_HANDLER,
  newDebtRequestRouter,
} from '../../src/cases/new-debt-request';
import {
  CommandBus,
  DebtCommandRepository,
  DebtDomainError,
  DebtQueryRepository,
  DomainCommandBus,
  EventPublisher,
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
    queryRepository.loanerExists(Arg.any()).returns(Promise.resolve(true));
    queryRepository.debtorExists(Arg.any()).returns(Promise.resolve(true));

    context.container.set<DebtQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.DEBT,
      queryRepository,
    );

    const commandRepository = Substitute.for<DebtCommandRepository>();
    commandRepository.create(Arg.any()).returns(Promise.resolve());

    context.container.set<DebtCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.DEBT,
      commandRepository,
    );

    const bus = new DomainCommandBus();
    bus.addHandler(
      NEW_DEBT_REQUEST_COMMAND,
      NEW_DEBT_REQUEST_COMMAND_HANDLER(context.container),
    );
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
  });

  when(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(
        url,
        express.json(),
        newDebtRequestRouter(context.container),
      ),
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
        Promise.reject(DebtDomainError.loanerNotFound(context.body.loanerId)),
    });
  });

  then(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(
        url,
        express.json(),
        newDebtRequestRouter(context.container),
      ),
    )
      .post(url)
      .set('Authorization', context.token)
      .send(context.body);
  });

  and(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );
};

defineFeature(loadFeature('./test/features/new-debt-request.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  beforeEach(done => {
    context.user = generateUserStub({
      email: userEmailVO('test@oumi.com'),
      id: userIdVO('AC9A3554-9EEB-4450-A1BE-22D8ABA32B47'),
      password: userPasswordVO('secret'),
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

  test('Should send a new debt request', step1(context));

  test('Should throw a user error not found', step2(context));
});
