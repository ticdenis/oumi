import ava, { TestInterface } from 'ava';

import { ValueObjectDomainError } from '../../src/core';
import { amountVO } from '../../src/domain/amount.props';
import { currencyVO, CurrencyVO } from '../../src/domain/currency.props';

const test = ava as TestInterface<{
  amount: number;
  currency: CurrencyVO;
}>;

test.before(t => {
  t.context.amount = 100;
  t.context.currency = currencyVO({ code: 'EUR', symbol: '€' });
});

test('should create an amount value object', t => {
  // When
  const vo = amountVO(t.context);
  // Then
  t.is(vo.value.amount, t.context.amount);
  t.is(vo.value.currency.code, t.context.currency.value.code);
  t.is(vo.value.currency.symbol, t.context.currency.value.symbol);
});

test('should throw an error creating an amount value object', t => {
  // When
  const fn = () => amountVO({ amount: null, currency: t.context.currency });
  // Then
  t.throws(fn, ValueObjectDomainError);
});
