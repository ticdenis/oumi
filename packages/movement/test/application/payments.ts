import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import { paymentsBuilderService, paymentsHandler } from '../../src/application';
import {
  PaymentsData,
  PaymentsQuery,
} from '../../src/application/payments/payments.query';
import { Payment, PaymentQueryRepository } from '../../src/domain';
import {
  PaymentDebtorIdStub,
  PaymentStub,
} from '../../src/infrastructure/test/payment.stubs';

const helper = {
  handler: (
    opts: Partial<{
      queryRepository: PaymentQueryRepository;
    }> = {},
  ) =>
    paymentsHandler(
      paymentsBuilderService({
        queryRepository:
          opts.queryRepository || Substitute.for<PaymentQueryRepository>(),
      }),
    ),
  query: (data: PaymentsData) => new PaymentsQuery(data),
};

const test = ava as TestInterface<{
  data: PaymentsData;
  payments: Payment[];
}>;

test.beforeEach(t => {
  t.context.data = {
    debtorId: PaymentDebtorIdStub.value,
  };
  t.context.payments = [PaymentStub, PaymentStub];
});

test('should throw debt not found', async t => {
  // Given
  const queryRepository = Substitute.for<PaymentQueryRepository>();
  queryRepository.allOfId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({
    queryRepository,
  });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.throwsAsync(fn);
});

test('should return a list of debtor payments', async t => {
  // Given
  const queryRepository = Substitute.for<PaymentQueryRepository>();
  queryRepository
    .allOfId(Arg.any())
    .returns(fromEither(right(t.context.payments)));
  const handler = helper.handler({
    queryRepository,
  });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.notThrowsAsync(fn);
});
