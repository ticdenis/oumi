import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  UPDATE_PROFILE_COMMAND,
  UPDATE_PROFILE_COMMAND_HANDLER,
  updateProfileRouter,
} from '../../src/cases/update-profile';
import {
  CommandBus,
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
  UserCommandRepository,
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

      const queryRepository = Substitute.for<UserQueryRepository>();
      queryRepository.ofId(Arg.any()).returns(fromEither(right(context.user)));

      const commandRepository = Substitute.for<UserCommandRepository>();
      commandRepository.updateProfile(Arg.any()).returns(Promise.resolve());

      const bus = DomainCommandBus.instance();

      context.container.set<UserQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.USER,
        queryRepository,
      );

      context.container.set<UserCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.USER,
        commandRepository,
      );

      bus.addHandler(
        UPDATE_PROFILE_COMMAND,
        UPDATE_PROFILE_COMMAND_HANDLER(context.container),
      );

      context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
    },
  );

  when('I set JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    const queryRepository = Substitute.for<UserQueryRepository>();
    queryRepository.ofId(Arg.any()).returns(fromEither(right(context.user)));

    context.container.set<UserQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.USER,
      queryRepository,
    );

    const commandRepository = Substitute.for<UserCommandRepository>();
    commandRepository.updateProfile(Arg.any()).returns(Promise.resolve());

    context.container.set<UserCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.USER,
      commandRepository,
    );

    const commandBus = DomainCommandBus.instance();
    commandBus.addHandler(
      UPDATE_PROFILE_COMMAND,
      UPDATE_PROFILE_COMMAND_HANDLER(context.container),
    );

    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, commandBus);
  });

  when(/^I request PUT method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().put(
        url,
        express.json(),
        updateProfileRouter(context.container),
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
        Promise.reject(UserDomainError.notFound(context.user.id.value)),
    });
  });

  then(/^I request PUT method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().put(
        url,
        express.json(),
        updateProfileRouter(context.container),
      ),
    )
      .put(url)
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

defineFeature(loadFeature('./test/features/update-profile.feature'), test => {
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

    context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

    context.container.set<EventPublisher>(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );

    done();
  });

  test('Should update profile', step1(context));

  test('Should throw a user error not found', step2(context));
});
