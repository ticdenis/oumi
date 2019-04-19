import { floatVO, simpleValueObject, ValueObject } from '../core';

import { CurrencyVO } from './currency.props';

export type AmountVO = ValueObject<
  Readonly<{ amount: number; currency: { code: string; symbol: string } }>
>;

export const amountVO = (value: {
  amount: number;
  currency: CurrencyVO;
}): AmountVO =>
  simpleValueObject({
    amount: floatVO(value.amount).value,
    currency: value.currency.value,
  });
