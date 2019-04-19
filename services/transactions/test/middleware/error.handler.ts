import { Oumi } from '@oumi-package/shared/lib/core';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { loadContainer, SERVICE_ID } from '../../src/config';
import { errorHandler } from '../../src/middleware';

describe('error handler', () => {
  let context: {
    container: Oumi.Container;
    err: Error;
    next: express.NextFunction;
    req: express.Request;
    res: express.Response;
  };

  beforeEach(done => {
    context = {
      container: loadContainer(),
      err: new Error(),
      next: Substitute.for<express.NextFunction>(),
      req: Substitute.for<express.Request>(),
      res: (() => {
        const _res: any = {};
        _res.status = jest.fn().mockReturnValue(_res);
        _res.json = jest.fn().mockReturnValue(_res);
        return _res;
      })(),
    };
    done();
  });

  test('log', async done => {
    // Given
    const logger: Oumi.Logger = {
      log: jest.fn(),
    };
    context.container.set<Oumi.Logger>(SERVICE_ID.LOGGER, logger);
    // When
    await errorHandler(context.container)(
      context.err,
      context.req,
      context.res,
      context.next,
    );
    // Then
    expect(logger.log).toBeCalled();
    done();
  });

  test('internal server error', async done => {
    // Given
    const logger = Substitute.for<Oumi.Logger>();
    logger.log(Arg.any());
    context.container.set<Oumi.Logger>(SERVICE_ID.LOGGER, logger);
    // When
    await errorHandler(context.container)(
      context.err,
      context.req,
      context.res,
      context.next,
    );
    // Then
    expect(context.res.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    done();
  });
});
