import {
  FloatVO,
  floatVO,
  simpleValueObject,
  ValueObject,
} from '@oumi-package/core';

import { CurrencyVO } from './currency.props';

export type AmountVO = ValueObject<
  Readonly<{ amount: FloatVO; currency: CurrencyVO }>
>;

export const amountVO = (value: {
  amount: number;
  currency: CurrencyVO;
}): AmountVO => {
  const amount = floatVO(value.amount);

  return simpleValueObject({ amount, currency: value.currency });
};
