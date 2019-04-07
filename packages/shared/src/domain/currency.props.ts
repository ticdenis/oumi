import {
  simpleValueObject,
  stringVO,
  ValueObject,
} from '@oumi-package/core/lib';

export type CurrencyVO = ValueObject<
  Readonly<{ code: string; symbol: string }>
>;

export const currencyVO = (value: {
  code: string;
  symbol: string;
}): CurrencyVO =>
  simpleValueObject({
    code: stringVO(value.code).value,
    symbol: stringVO(value.symbol).value,
  });
