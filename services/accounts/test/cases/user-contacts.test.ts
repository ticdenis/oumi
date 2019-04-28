import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  USER_CONTACTS_QUERY,
  USER_CONTACTS_QUERY_HANDLER,
  userContactsRouter,
} from '../../src/cases/user-contacts';
import {
  amountVO,
  Contact,
  contactFirstnameVO,
  contactIdVO,
  contactLastnameVO,
  contactNicknameVO,
  ContactQueryRepository,
  DomainQueryBus,
  EuroCurrencyStub,
  generateContactStub,
  generateEuroContactDebtStub,
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
} from '../helpers/domain-imports';

interface Context {
  contacts: Contact[];
  container: Oumi.Container;
  res: supertest.Response;
  token: string;
  user: User;
}

const step1 = (context: Context) => ({
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

      const queryRepository = Substitute.for<ContactQueryRepository>();
      queryRepository
        .allOfId(Arg.any())
        .returns(fromEither(right(context.contacts)));

      context.container.set<ContactQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.CONTACT,
        queryRepository,
      );

      const queryBus = DomainQueryBus.instance();
      queryBus.addHandler(
        USER_CONTACTS_QUERY,
        USER_CONTACTS_QUERY_HANDLER(context.container),
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
      express().get(url, userContactsRouter(context.container)),
    )
      .get(url)
      .set('Authorization', context.token)
      .send();
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );

  and('I expect response to match:', (response: string) => {
    expect(context.res.body).toMatchObject(JSON.parse(response));
  });
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
      express().get(url, userContactsRouter(context.container)),
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
};

defineFeature(loadFeature('./test/features/user-contacts.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  beforeEach(done => {
    context.user = generateUserStub({
      email: userEmailVO('test@oumi.com'),
      firstname: userFirstnameVO('Test'),
      id: userIdVO('6E8B183E-8363-4108-9FEA-8C1B6B0A7C93'),
      lastname: userLastnameVO('Er'),
      nickname: userNicknameVO('oumi'),
      password: userPasswordVO('secret'),
      phone: userPhoneVO('123456789'),
    });

    context.contacts = [
      generateContactStub({
        debts: [
          generateEuroContactDebtStub({
            amount: amountVO({
              amount: 100,
              currency: EuroCurrencyStub,
            }),
            id: context.user.id,
          }),
        ],
        firstname: contactFirstnameVO('Cont'),
        id: contactIdVO('64C55E0A-8C49-4B40-9D88-C3202CCAAFA2'),
        lastname: contactLastnameVO('Act'),
        nickname: contactNicknameVO('contact'),
      }),
    ];

    context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

    done();
  });

  test('Should get my contacts', step1(context));

  test('Should throw a user error not found', step2(context));
});
