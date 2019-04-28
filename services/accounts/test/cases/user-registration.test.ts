import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { left } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import supertest from 'supertest';

import {
  USER_REGISTRATION_COMMAND,
  USER_REGISTRATION_COMMAND_HANDLER,
  userRegistrationRouter,
} from '../../src/cases/user-registration';
import {
  CommandBus,
  DomainCommandBus,
  EventPublisher,
  loadContainer,
  Oumi,
  SERVICE_ID,
  UserCommandRepository,
  UserDomainError,
  UserQueryRepository,
} from '../helpers/domain-imports';

interface Context {
  body: any;
  container: Oumi.Container;
  res: supertest.Response;
}

const step1 = (context: Context) => ({
  given,
  when,
  then,
}: StepsDefinitionCallbackOptions) => {
  given('JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    const queryRepository = Substitute.for<UserQueryRepository>();
    queryRepository.ofEmail(Arg.any()).returns(fromEither(left(null)));

    context.container.set<UserQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.USER,
      queryRepository,
    );

    const commandRepository = Substitute.for<UserCommandRepository>();
    commandRepository.create(Arg.any()).returns(Promise.resolve());

    context.container.set<UserCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.USER,
      commandRepository,
    );

    const commandBus = DomainCommandBus.instance();
    commandBus.addHandler(
      USER_REGISTRATION_COMMAND,
      USER_REGISTRATION_COMMAND_HANDLER(context.container),
    );

    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, commandBus);
  });

  when(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(
        url,
        express.json(),
        userRegistrationRouter(context.container),
      ),
    )
      .post(url)
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
  given('JSON request body as:', (body: string) => {
    context.body = JSON.parse(body);

    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () =>
        Promise.reject(UserDomainError.alreadyExists(context.body.email)),
    });
  });

  when(/^I request POST method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().post(
        url,
        express.json(),
        userRegistrationRouter(context.container),
      ),
    )
      .post(url)
      .send(context.body);
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );

  and('I expect response to match:', (response: string) =>
    expect(context.res.body).toMatchObject(JSON.parse(response)),
  );
};

defineFeature(
  loadFeature('./test/features/user-registration.feature'),
  test => {
    const context: Context = {
      container: loadContainer(),
    } as any;

    beforeEach(done => {
      context.container.set<EventPublisher>(
        SERVICE_ID.EVENT_PUBLISHER,
        Substitute.for<EventPublisher>(),
      );

      done();
    });

    test('Should register an user', step1(context));

    test('Should throw a user email already exists error', step2(context));
  },
);
