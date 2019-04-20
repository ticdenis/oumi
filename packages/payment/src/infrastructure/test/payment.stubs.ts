import {
  Payment,
  PaymentConstructor,
  PaymentDebt,
  paymentDebtIdVO,
  paymentDebtQuantityVO,
  paymentDebtUserIdVO,
  paymentIdVO,
  paymentMessageVO,
  paymentOcurredOnVO,
  paymentQuantityVO,
} from '../../domain';

// tslint:disable-next-line: variable-name
export const PaymentDebtIdStub = paymentDebtIdVO(
  '00000000-0000-0000-0000-000000000001',
);

// tslint:disable-next-line: variable-name
export const PaymentDebtorIdStub = paymentDebtUserIdVO(
  '00000000-0000-0000-0000-000000000002',
);

// tslint:disable-next-line: variable-name
export const PaymentLoanerIdStub = paymentDebtUserIdVO(
  '00000000-0000-0000-0000-000000000003',
);

// tslint:disable-next-line: variable-name
export const PaymentDebtQuantityStub = paymentDebtQuantityVO(100);

// tslint:disable-next-line: variable-name
export const PaymentQuantityStub = paymentQuantityVO(100);

// tslint:disable-next-line: variable-name
export const PaymentIdStub = paymentIdVO(
  '00000000-0000-0000-0000-000000000001',
);

// tslint:disable-next-line: variable-name
export const PaymentMessageStub = paymentMessageVO('message');

// tslint:disable-next-line: variable-name
export const PaymentOcurredOnStub = paymentOcurredOnVO(new Date());

// tslint:disable-next-line: variable-name
export const PaymentDebtStub = {
  debtorId: PaymentDebtorIdStub,
  id: PaymentDebtIdStub,
  loanerId: PaymentLoanerIdStub,
  quantity: PaymentQuantityStub,
};

export const generatePaymentDebtStub = (args: Partial<PaymentDebt> = {}) => ({
  debtorId: args.debtorId || PaymentDebtorIdStub,
  id: args.id || PaymentDebtIdStub,
  loanerId: args.loanerId || PaymentLoanerIdStub,
  quantity: args.quantity || PaymentQuantityStub,
});

// tslint:disable-next-line: variable-name
export const PaymentStub = new Payment({
  debt: PaymentDebtStub,
  id: PaymentIdStub,
  message: PaymentMessageStub,
  occurredOn: PaymentOcurredOnStub,
  quantity: PaymentQuantityStub,
});

export const generatePaymentStub = (args: Partial<PaymentConstructor> = {}) =>
  new Payment({
    debt: args.debt || PaymentDebtStub,
    id: args.id || PaymentIdStub,
    message: args.message || PaymentMessageStub,
    occurredOn: args.occurredOn || PaymentOcurredOnStub,
    quantity: args.quantity || PaymentQuantityStub,
  });
