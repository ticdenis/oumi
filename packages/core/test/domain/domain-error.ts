import ava, { TestInterface } from 'ava';

import { DomainError } from '../../src/domain';

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
  class TestDomainError extends DomainError {}
  // When
  const error = new TestDomainError(args.code, args.message);
  // Then
  t.is(error.name, TestDomainError.name);
  t.is(error.message, args.message);
  t.is(error.code, args.code);
});
