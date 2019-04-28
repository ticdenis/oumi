import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  CONFIRM_CONTACT_REQUEST_COMMAND,
  CONFIRM_CONTACT_REQUEST_COMMAND_HANDLER,
  confirmContactRequestRouter,
} from '../../src/cases/confirm-contact-request';
import {
  CommandBus,
  Contact,
  ContactCommandRepository,
  ContactDomainError,
  ContactId,
  contactIdVO,
  ContactQueryRepository,
  ContactRequestStatusPendingStub,
  DomainCommandBus,
  EventPublisher,
  generateContactRequestStub,
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
  uuidVO,
} from '../helpers/domain-imports';

interface Context {
  body: any;
  contact: Contact;
  container: Oumi.Container;
  requester: Contact;
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
      .ofId(Arg.is((id: ContactId) => context.contact.id.equalsTo(id)))
      .returns(fromEither(right(context.contact)));
    queryRepository
      .ofId(Arg.is((id: ContactId) => context.requester.id.equalsTo(id)))
      .returns(fromEither(right(context.requester)));

    context.container.set<ContactQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      queryRepository,
    );

    const commandRepository = Substitute.for<ContactCommandRepository>();
    commandRepository.confirmRequest(Arg.any()).returns(Promise.resolve());

    context.container.set<ContactCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.CONTACT,
      commandRepository,
    );

    const bus = DomainCommandBus.instance();
    bus.addHandler(
      CONFIRM_CONTACT_REQUEST_COMMAND,
      CONFIRM_CONTACT_REQUEST_COMMAND_HANDLER(context.container),
    );
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
  });

  when(/^I request PUT method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().put(
        url,
        express.json(),
        confirmContactRequestRouter(context.container),
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
          ContactDomainError.notFound('id', context.requester.id.value),
        ),
    });
  });

  then(/^I request PUT method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().put(
        url,
        express.json(),
        confirmContactRequestRouter(context.container),
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
  loadFeature('./test/features/confirm-contact-request.feature'),
  test => {
    const context: Context = {
      container: loadContainer(),
    } as any;

    beforeEach(done => {
      context.user = generateUserStub({
        email: userEmailVO('test@oumi.com'),
        firstname: userFirstnameVO('Test'),
        id: userIdVO('F92A818C-F5E9-4792-8F59-64B41E851558'),
        lastname: userLastnameVO('Er'),
        nickname: userNicknameVO('oumi'),
        password: userPasswordVO('secret'),
        phone: userPhoneVO('123456789'),
      });

      const contactId = contactIdVO(context.user.id.value);
      const requesterId = contactIdVO('EA6262AC-4E35-405B-ADBA-D3A0FA41C02C');

      context.contact = generateContactStub({
        id: contactId,
        requests: [
          generateContactRequestStub({
            id: requesterId,
            status: ContactRequestStatusPendingStub,
          }),
        ],
      });

      context.requester = generateContactStub({
        id: requesterId,
        requests: [
          generateContactRequestStub({
            id: contactId,
            status: ContactRequestStatusPendingStub,
          }),
        ],
      });

      context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

      context.container.set<EventPublisher>(
        SERVICE_ID.EVENT_PUBLISHER,
        Substitute.for<EventPublisher>(),
      );

      done();
    });

    test('Should confirm a contact request', step1(context));

    test('Should throw a contact error not found', step2(context));
  },
);
