import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { OK } from 'http-status-codes';

import { healthzGetController } from '../../src/controller';
import { Container } from '../../src/dsl';

test('should responses a 200 HTTP Status Code', () => {
  // Given
  const container = Substitute.for<Container>();
  const handler = healthzGetController(container);
  const req = Substitute.for<express.Request>();
  const res = Substitute.for<express.Response>();
  const next = Substitute.for<express.NextFunction>();
  // When
  handler(req, res, next);
  // Then
  res.received(1).status(
    Arg.is(arg => {
      const actual = arg === OK;
      expect(actual).toBe(OK);
      return actual;
    }),
  );
});
