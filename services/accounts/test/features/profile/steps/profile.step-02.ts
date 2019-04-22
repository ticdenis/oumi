import express from 'express';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import { profileRouter } from '../../../../src/features/profile';
import {
  QueryBus,
  SERVICE_ID,
  simpleJWTFactory,
  simpleJWTReader,
  stringVO,
  TokenReader,
  UserDomainError,
} from '../../../helpers/domain-imports';
import { Context } from '../profile';

export const step2 = (context: Context) => ({
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
      express().get(url, profileRouter(context.container)),
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
