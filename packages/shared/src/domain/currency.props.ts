import {
  simpleValueObject,
  stringVO,
  ValueObject,
} from '@oumi-package/core/lib';

export type CurrencyVO = ValueObject<
  Readonly<{ code: string; symbol: string }>
>;

// TODO: ISO
export const currencyVO = (value: {
  code: string;
  symbol: string;
}): CurrencyVO =>
  simpleValueObject({
    code: stringVO(value.code).value,
    symbol: stringVO(value.symbol).value,
  });

// TODO: ISO
const SYMBOLS = new Map<string, string>();
SYMBOLS.set('EUR', '€');
SYMBOLS.set('USD', '$');

export const currencyFromCodeVO = (value: string): CurrencyVO =>
  currencyVO({
    code: value,
    symbol: SYMBOLS.get(value),
  });
