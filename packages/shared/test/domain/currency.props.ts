import { ValueObjectDomainError } from '@oumi-package/core';

import ava, { TestInterface } from 'ava';

import { currencyVO } from '../../src/domain/currency.props';

const test = ava as TestInterface<{
  code: string;
  symbol: string;
}>;

test.before(t => {
  t.context.code = 'EUR';
  t.context.symbol = '€';
});

test('should create an currency value object', t => {
  // When
  const vo = currencyVO(t.context);
  // Then
  t.is(vo.value.code, t.context.code);
  t.is(vo.value.symbol, t.context.symbol);
});

test('should throw an error creating an currency value object', t => {
  // When
  const fn = () => currencyVO({ code: null, symbol: null });
  // Then
  t.throws(fn, ValueObjectDomainError);
});
