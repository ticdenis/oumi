import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  NEW_CONTACT_REQUEST_COMMAND,
  NEW_CONTACT_REQUEST_COMMAND_HANDLER,
  newContactRequestRouter,
} from '../../src/cases/new-contact-request';
import {
  CommandBus,
  Contact,
  ContactCommandRepository,
  ContactDomainError,
  contactIdVO,
  contactNicknameVO,
  ContactQueryRepository,
  DomainCommandBus,
  EventPublisher,
  generateContactStub,
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
  userFirstnameVO,
  UserId,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
} from '../helpers/domain-imports';

interface Context {
  body: any;
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

      context.container.set<TokenReader>(
        SERVICE_ID.TOKEN_READER,
        simpleJWTReader('secret'),
      );
    },
  );

  when('I set JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    const queryRepository = Substitute.for<ContactQueryRepository>();
    queryRepository
      .ofId(Arg.any())
      .returns(fromEither(right(context.contacts[0])));
    queryRepository
      .ofNickname(Arg.any())
      .returns(fromEither(right(context.contacts[1])));

    context.container.set<ContactQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      queryRepository,
    );

    const commandRepository = Substitute.for<ContactCommandRepository>();
    commandRepository.newRequest(Arg.any()).returns(Promise.resolve());

    context.container.set<ContactCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.CONTACT,
      commandRepository,
    );

    const bus = new DomainCommandBus();
    bus.addHandler(
      NEW_CONTACT_REQUEST_COMMAND,
      NEW_CONTACT_REQUEST_COMMAND_HANDLER(context.container),
    );
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
  });

  when(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(
        url,
        express.json(),
        newContactRequestRouter(context.container),
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

      expect(true).toBe(context.contacts[1].id.equalsTo(stringVO(id)));

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

      context.container.set<TokenReader>(
        SERVICE_ID.TOKEN_READER,
        simpleJWTReader('secret'),
      );
    },
  );

  when('I set JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () =>
        Promise.reject(
          ContactDomainError.notFound('id', context.contacts[1].id.value),
        ),
    });
  });

  then(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(
        url,
        express.json(),
        newContactRequestRouter(context.container),
      ),
    )
      .post(url)
      .set('Authorization', context.token)
      .send(context.body);
  });

  and(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );

  and('I expect response to match:', (response: string) =>
    expect(context.res.body).toMatchObject(JSON.parse(response)),
  );
};

defineFeature(
  loadFeature('./test/features/new-contact-request.feature'),
  test => {
    const context: Context = {
      container: loadContainer(),
    } as any;

    beforeEach(done => {
      context.user = generateUserStub({
        email: userEmailVO('test@oumi.com'),
        firstname: userFirstnameVO('Test'),
        id: userIdVO('180B5568-3227-47FA-A68F-467923957F87'),
        lastname: userLastnameVO('Er'),
        nickname: userNicknameVO('oumi'),
        password: userPasswordVO('secret'),
        phone: userPhoneVO('123456789'),
      });

      context.contacts = [
        generateContactStub({
          id: contactIdVO(context.user.id.value),
          nickname: contactNicknameVO(context.user.nickname.value),
          requests: [],
        }),
        generateContactStub({
          id: contactIdVO('4957D4F7-A480-4A40-8DB5-B6F86739E8CE'),
          nickname: contactNicknameVO('other'),
          requests: [],
        }),
      ];

      context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

      context.container.set<EventPublisher>(
        SERVICE_ID.EVENT_PUBLISHER,
        Substitute.for<EventPublisher>(),
      );

      done();
    });

    test('Should send a new contact request', step1(context));

    test('Should throw a contact error not found', step2(context));
  },
);
