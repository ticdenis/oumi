import { Oumi } from '@oumi-package/shared/lib/core';

import express from 'express';
import { loadFeature } from 'jest-cucumber';
import {
  defineFeature,
  StepsDefinitionCallbackOptions,
} from 'jest-cucumber/dist/src/feature-definition-creation';
import supertest from 'supertest';

import { rootRouter } from '../../src/cases/root';
import { loadContainer } from '../../src/config';

interface Context {
  container: Oumi.Container;
  res: supertest.Response;
}

const step1 = (context: Context) => ({
  when,
  then,
  and,
}: StepsDefinitionCallbackOptions) => {
  when(/^I request GET method at "([^"]*)" url$/, async (url: string) => {
    context.res = await supertest(
      express().get(url, rootRouter(context.container)),
    )
      .get(url)
      .send();
  });

  then(/^I expect response to have status as "([^"]*)"$/, (status: string) =>
    expect(context.res.status).toBe(+status),
  );

  and('I expect response to match:', (response: string) =>
    expect(context.res.body).toMatchObject(JSON.parse(response)),
  );
};

defineFeature(loadFeature('./test/features/root.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  test('Visit root', step1(context));
});
