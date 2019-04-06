import { amountVO } from '../../domain/amount.props';

import { DolarCurrencyStub, EuroCurrencyStub } from './currency.stubs';

export const DEFAULT_AMOUNT_STUB = 100.0;

// tslint:disable-next-line: variable-name
export const EuroAmountStub = amountVO({
  amount: DEFAULT_AMOUNT_STUB,
  currency: EuroCurrencyStub,
});

// tslint:disable-next-line: variable-name
export const DolarAmountStub = amountVO({
  amount: DEFAULT_AMOUNT_STUB,
  currency: DolarCurrencyStub,
});
