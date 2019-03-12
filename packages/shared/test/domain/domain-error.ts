import ava, { TestInterface } from 'ava';

import { domainError } from '../../src/domain/domain-error';

const test = ava as TestInterface<{
  code: string;
  message: string;
}>;

test.before(t => {
  t.context.code = 'code';
  t.context.message = 'message';
});

test('should create a domain error', t => {
  // Given
  const args = t.context;
  // When
  const error = domainError(args.code, args.message);
  // Then
  t.true(error instanceof Error);
  t.is(error.message, args.message);
  t.is(error.name, args.code);
});
