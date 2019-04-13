import { Oumi } from '@oumi-package/core/lib';

import { Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../src/config';
import { healthzGetController } from '../../src/controller';

describe('healthz GET controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    context = {
      app: () =>
        express().get('/test', healthzGetController(context.container)),
      container: loadContainer(),
      request: () => supertest(context.app()).get('/test'),
    };
    done();
  });

  test('read or write database not available', async done => {
    // Given
    const fakeDB = Substitute.for<Oumi.Database>();
    fakeDB.isConnected().returns(Promise.resolve(false));
    context.container.set<Oumi.Database>(SERVICE_ID.DB, fakeDB);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.SERVICE_UNAVAILABLE);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('ready', async done => {
    // Given
    const fakeDB = Substitute.for<Oumi.Database>();
    fakeDB.isConnected().returns(Promise.resolve(true));
    context.container.set<Oumi.Database>(SERVICE_ID.DB, fakeDB);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toBe(HttpStatus.getStatusText(HttpStatus.OK));
    expect(res.body.errors).toBeNull();
    done();
  });
});
