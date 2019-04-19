import ava, { TestInterface } from 'ava';

import { ValueObjectDomainError } from '../../src/core';
import { debtIdVO } from '../../src/domain/debt.props';

const test = ava as TestInterface<{
  id: string;
}>;

test.before(t => {
  t.context.id = 'B7802DDE-CAF0-498E-9993-43B8B5D4EFA2';
});

test('should create a id value object', t => {
  // When
  const vo = debtIdVO(t.context.id);
  // Then
  t.is(vo.value, t.context.id);
});

test('should throw an error creating a id value object', t => {
  // Given
  const value = 'debt-id';
  // When
  const fn = () => debtIdVO(value);
  // Then
  t.throws(fn, ValueObjectDomainError);
});
