import {
  simpleValueObject,
  StringVO,
  stringVO,
  ValueObject,
} from '@oumi-package/core';

export type CurrencyVO = ValueObject<
  Readonly<{ code: StringVO; symbol: StringVO }>
>;

export const currencyVO = (value: {
  code: string;
  symbol: string;
}): CurrencyVO => {
  const code = stringVO(value.code);
  const symbol = stringVO(value.symbol);

  return simpleValueObject({ code, symbol });
};
