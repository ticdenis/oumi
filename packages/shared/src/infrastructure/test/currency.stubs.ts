import { currencyVO } from '../../domain/currency.props';

export const EuroCurrencyStub = currencyVO({
  code: 'EUR',
  symbol: '€',
});

export const DolarCurrencyStub = currencyVO({
  code: 'USD',
  symbol: '$',
});
