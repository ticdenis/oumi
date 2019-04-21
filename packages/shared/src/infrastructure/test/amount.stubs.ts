import { amountVO } from '../../domain/amount.props';

import { DolarCurrencyStub, EuroCurrencyStub } from './currency.stubs';

export const DEFAULT_AMOUNT_STUB = 100.0;

export const EuroAmountStub = amountVO({
  amount: DEFAULT_AMOUNT_STUB,
  currency: EuroCurrencyStub,
});

export const DolarAmountStub = amountVO({
  amount: DEFAULT_AMOUNT_STUB,
  currency: DolarCurrencyStub,
});
