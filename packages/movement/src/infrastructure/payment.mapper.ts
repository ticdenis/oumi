import * as R from 'ramda';

import {
  Payment,
  paymentDebtIdVO,
  paymentDebtQuantityVO,
  paymentDebtUserIdVO,
  PaymentDomainError,
  paymentIdVO,
  PaymentMapper,
  paymentMessageVO,
  paymentOcurredOnVO,
  paymentQuantityVO,
} from '../domain';

const item = R.ifElse(
  R.has('id'),
  source =>
    new Payment({
      debt: {
        debtorId: paymentDebtUserIdVO(source.debt.debtorId),
        id: paymentDebtIdVO(source.debt.id),
        loanerId: paymentDebtUserIdVO(source.debt.loanerId),
        quantity: paymentDebtQuantityVO(source.debt.quantity),
      },
      id: paymentIdVO(source.id),
      message: paymentMessageVO(source.message),
      occurredOn: paymentOcurredOnVO(source.occurredOn),
      quantity: paymentQuantityVO(source.quantity),
    }),
  source => {
    throw PaymentDomainError.invalidSource(source);
  },
);

export const jsonPaymentMapper: PaymentMapper<object> = {
  item,
  items: R.map(item),
};
