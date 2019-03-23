import { koResponse, okResponse, Oumi } from '@oumi-package/core/lib';

import { Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../../src/config';
import { healthzGetController } from '../../../src/controller';

describe('healthz GET controller', () => {
  let context: {
    container: Oumi.Container;
    next: express.NextFunction;
    req: express.Request;
    res: express.Response;
  };

  beforeEach(done => {
    context = {
      container: (() => {
        const obj: any = {};
        return {
          get: (key: string) => obj[key],
          set: (key: string, value: any) => {
            obj[key] = value;
          },
        } as any;
      })(),
      next: Substitute.for<express.NextFunction>(),
      req: Substitute.for<express.Request>(),
      res: (() => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      })(),
    };

    done();
  });

  test('read or write database not available', async () => {
    // Given
    const fakeDB: Oumi.Database = {
      connect: () => Promise.resolve(undefined),
      connection: () => Promise.resolve() as any,
      disconnect: () => Promise.resolve(),
      isConnected: () => Promise.resolve(false),
    };
    context.container.set<Oumi.Database>(SERVICE_ID.DB.READ, fakeDB);
    context.container.set<Oumi.Database>(SERVICE_ID.DB.WRITE, fakeDB);
    // When
    await healthzGetController(context.container)(
      context.req,
      context.res,
      context.next,
    );
    // Then
    expect(context.res.status).toHaveBeenCalledWith(
      HttpStatus.SERVICE_UNAVAILABLE,
    );
    expect(context.res.json).toHaveBeenCalledWith(
      koResponse([
        {
          code: 'DATABASE_NOT_AVAILABLE',
          message: 'Database not available',
        },
      ]),
    );
  });

  test('ready', async () => {
    // Given
    const fakeDB: Oumi.Database = {
      connect: () => Promise.resolve(undefined),
      connection: () => Promise.resolve() as any,
      disconnect: () => Promise.resolve(),
      isConnected: () => Promise.resolve(true),
    };
    context.container.set<Oumi.Database>(SERVICE_ID.DB.READ, fakeDB);
    context.container.set<Oumi.Database>(SERVICE_ID.DB.WRITE, fakeDB);
    // When
    await healthzGetController(context.container)(
      context.req,
      context.res,
      context.next,
    );
    // Then
    expect(context.res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(context.res.json).toHaveBeenCalledWith(
      okResponse(HttpStatus.getStatusText(HttpStatus.OK)),
    );
  });
});
