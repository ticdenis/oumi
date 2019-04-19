import { Oumi } from '@oumi-package/shared/lib/core';

import { Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { rootGetController } from '../../src/controller';

describe('healthz GET controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    context = {
      app: () => express().get('/', rootGetController(context.container)),
      container: Substitute.for<Oumi.Container>(),
      request: () => supertest(context.app()).get('/'),
    };
    done();
  });

  test('hello service', async done => {
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toBe('Transaction service');
    expect(res.body.errors).toBeNull();
    done();
  });
});
