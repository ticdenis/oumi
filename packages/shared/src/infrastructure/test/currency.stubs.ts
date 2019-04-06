import { currencyVO } from '../../domain/currency.props';

// tslint:disable-next-line: variable-name
export const EuroCurrencyStub = currencyVO({
  code: 'EUR',
  symbol: '€',
});

// tslint:disable-next-line: variable-name
export const DolarCurrencyStub = currencyVO({
  code: 'USD',
  symbol: '$',
});
