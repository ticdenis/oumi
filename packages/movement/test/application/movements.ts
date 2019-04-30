import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  movementsBuilderService,
  MovementsData,
  movementsHandler,
  MovementsQuery,
} from '../../src/application';
import {
  Debt,
  DebtQueryRepository,
  Payment,
  paymentDebtIdVO,
  paymentIdVO,
  PaymentQueryRepository,
} from '../../src/domain';
import { generateDebtStub } from '../../src/infrastructure/test/debt.stubs';
import {
  generatePaymentDebtStub,
  generatePaymentStub,
  PaymentDebtorIdStub,
} from '../../src/infrastructure/test/payment.stubs';

const helper = {
  handler: (
    opts: Partial<{
      debtQueryRepository: DebtQueryRepository;
      paymentQueryRepository: PaymentQueryRepository;
    }> = {},
  ) =>
    movementsHandler(
      movementsBuilderService({
        debtQueryRepository:
          opts.debtQueryRepository || Substitute.for<DebtQueryRepository>(),
        paymentQueryRepository:
          opts.paymentQueryRepository ||
          Substitute.for<PaymentQueryRepository>(),
      }),
    ),
  query: (data: MovementsData) => new MovementsQuery(data),
};

const test = ava as TestInterface<{
  debts: Debt[];
  charges: Payment[];
  data: MovementsData;
  payments: Payment[];
}>;

test.beforeEach(t => {
  t.context.charges = [
    generatePaymentStub({
      debt: generatePaymentDebtStub({
        id: paymentDebtIdVO(),
      }),
      id: paymentIdVO(),
    }),
  ];
  t.context.data = {
    debtorId: PaymentDebtorIdStub.value,
  };
  t.context.payments = [
    generatePaymentStub({
      debt: generatePaymentDebtStub({
        id: paymentDebtIdVO(),
      }),
      id: paymentIdVO(),
    }),
  ];
  t.context.debts = [
    generateDebtStub({
      id: t.context.charges[0].debt.id,
    }),
    generateDebtStub({
      id: t.context.payments[0].debt.id,
    }),
  ];
});

test.skip('should throw debtor of payments not found', async t => {
  // Given
  const paymentQueryRepository = Substitute.for<PaymentQueryRepository>();
  paymentQueryRepository.allOfId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({
    paymentQueryRepository,
  });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.throwsAsync(fn);
});

test.skip('should throw debtor of charges not found', async t => {
  // Given
  const paymentQueryRepository = Substitute.for<PaymentQueryRepository>();
  paymentQueryRepository
    .allOfId(Arg.any())
    .returns(fromEither(right(t.context.payments)));
  paymentQueryRepository.allChargesOfId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({
    paymentQueryRepository,
  });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.throwsAsync(fn);
});

test.skip('should throw some any debt from charges and payments not found', async t => {
  // Given
  const paymentQueryRepository = Substitute.for<PaymentQueryRepository>();
  paymentQueryRepository
    .allOfId(Arg.any())
    .returns(fromEither(right(t.context.payments)));
  paymentQueryRepository
    .allChargesOfId(Arg.any())
    .returns(fromEither(right(t.context.charges)));
  const debtQueryRepository = Substitute.for<DebtQueryRepository>();
  debtQueryRepository.allOfIds(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({
    debtQueryRepository,
    paymentQueryRepository,
  });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.throwsAsync(fn);
});

test('should return a list of movements', async t => {
  // Given
  const paymentQueryRepository = Substitute.for<PaymentQueryRepository>();
  paymentQueryRepository
    .allOfId(Arg.any())
    .returns(fromEither(right(t.context.payments)));
  paymentQueryRepository
    .allChargesOfId(Arg.any())
    .returns(fromEither(right(t.context.charges)));
  const debtQueryRepository = Substitute.for<DebtQueryRepository>();
  debtQueryRepository
    .allOfIds(Arg.any())
    .returns(fromEither(right(t.context.debts)));
  const handler = helper.handler({
    debtQueryRepository,
    paymentQueryRepository,
  });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.notThrowsAsync(fn);
});
