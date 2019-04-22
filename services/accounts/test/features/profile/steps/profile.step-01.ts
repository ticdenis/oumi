import Substitute, { Arg } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import { StepsDefinitionCallbackOptions } from 'jest-cucumber/dist/src/feature-definition-creation';
import moment from 'moment';
import supertest from 'supertest';

import {
  PROFILE_QUERY,
  PROFILE_QUERY_HANDLER,
  profileRouter,
} from '../../../../src/features/profile';
import {
  DomainQueryBus,
  QueryBus,
  SERVICE_ID,
  simpleJWTFactory,
  simpleJWTReader,
  stringVO,
  TokenReader,
  UserQueryRepository,
} from '../../../helpers/domain-imports';
import { Context } from '../profile';

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

      const queryBus = DomainQueryBus.instance();
      queryBus.addHandler(
        PROFILE_QUERY,
        PROFILE_QUERY_HANDLER(context.container),
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
