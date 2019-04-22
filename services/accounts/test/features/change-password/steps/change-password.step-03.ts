import express from 'express';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import { changePasswordRouter } from '../../../../src/features/change-password';
import {
  CommandBus,
  SERVICE_ID,
  simpleJWTFactory,
  simpleJWTReader,
  stringVO,
  TokenReader,
  UserDomainError,
} from '../../../helpers/domain-imports';
import { Context } from '../change-password';

export const step3 = (context: Context) => ({
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

      context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
        dispatch: () =>
          Promise.reject(
            UserDomainError.passwordNotMatch(context.body.oldPassword),
          ),
      });

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

  and('I expect response to match:', (response: string) =>
    expect(context.res.body).toMatchObject(JSON.parse(response)),
  );
};
