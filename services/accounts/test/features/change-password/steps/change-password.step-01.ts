import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  CHANGE_PASSWORD_COMMAND,
  CHANGE_PASSWORD_COMMAND_HANDLER,
  changePasswordRouter,
} from '../../../../src/features/change-password';
import {
  CommandBus,
  DomainCommandBus,
  SERVICE_ID,
  simpleJWTFactory,
  simpleJWTReader,
  stringVO,
  TokenReader,
  UserCommandRepository,
  UserQueryRepository,
} from '../../../helpers/domain-imports';
import { Context } from '../change-password.test';

export const step1 = (context: Context) => ({
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

      const queryRepository = Substitute.for<UserQueryRepository>();
      queryRepository.ofId(Arg.any()).returns(fromEither(right(context.user)));

      context.container.set<UserQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.USER,
        queryRepository,
      );

      const commandRepository = Substitute.for<UserCommandRepository>();
      commandRepository.updatePassword(Arg.any()).returns(Promise.resolve());

      context.container.set<UserCommandRepository>(
        SERVICE_ID.COMMAND_REPOSITORY.USER,
        commandRepository,
      );

      const commandBus = DomainCommandBus.instance();
      commandBus.addHandler(
        CHANGE_PASSWORD_COMMAND,
        CHANGE_PASSWORD_COMMAND_HANDLER(context.container),
      );

      context.container.set<CommandBus>(
        SERVICE_ID.BUS.SYNC_COMMAND,
        commandBus,
      );

      context.container.set<TokenReader>(
        SERVICE_ID.TOKEN_READER,
        simpleJWTReader('secret'),
      );
    },
  );

  when(
    'I set JSON request body as:',
    (body: string) => (context.body = JSON.parse(body)),
  );

  then(/^I request PUT method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().put(
        url,
        express.json(),
        changePasswordRouter(context.container),
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
