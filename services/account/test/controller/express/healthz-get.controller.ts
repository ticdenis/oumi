import { Oumi } from '@oumi-package/core';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../../src/config';
import { healthzGetController } from '../../../src/controller';

test('should responses a 200 HTTP Status Code', () => {
  // Given
  const container = Substitute.for<Oumi.Container>();
  container.set<Oumi.Database>(SERVICE_ID.db, {
    isConnected: () => Promise.resolve(true),
  } as any);
  const handler = healthzGetController(container);
  const req = Substitute.for<express.Request>();
  const res = Substitute.for<express.Response>();
  const next = Substitute.for<express.NextFunction>();
  // When
  handler(req, res, next);
  // Then
  res.received(2).status(
    Arg.is(actual => {
      expect(actual).toBe(HttpStatus.OK);
      return actual === HttpStatus.OK;
    }),
  );
});
