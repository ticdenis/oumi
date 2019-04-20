import { EventPublisher } from '@oumi-package/shared/lib/core';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  newPayBuilderService,
  NewPayCommand,
  NewPayData,
  newPayHandler,
} from '../../src/application';
import {
  Payment,
  PaymentCommandRepository,
  paymentDebtQuantityVO,
  PaymentQueryRepository,
} from '../../src/domain';
import {
  generatePaymentDebtStub,
  PaymentDebtIdStub,
  PaymentDebtStub,
  PaymentIdStub,
  PaymentMessageStub,
  PaymentQuantityStub,
  PaymentStub,
} from '../../src/infrastructure/test/payment.stubs';

const helper = {
  command: (data: NewPayData) => new NewPayCommand(data),
  handler: (
    opts: Partial<{
      commandRepository: PaymentCommandRepository;
      eventPublisher: EventPublisher;
      queryRepository: PaymentQueryRepository;
    }> = {},
  ) =>
    newPayHandler(
      newPayBuilderService({
        commandRepository:
          opts.commandRepository || Substitute.for<PaymentCommandRepository>(),
        eventPublisher: opts.eventPublisher || Substitute.for<EventPublisher>(),
        queryRepository:
          opts.queryRepository || Substitute.for<PaymentQueryRepository>(),
      }),
    ),
};

const test = ava as TestInterface<{
  data: NewPayData;
  payment: Payment;
}>;

test.beforeEach(t => {
  t.context.data = {
    debtId: PaymentDebtIdStub.value,
    id: PaymentIdStub.value,
    message: PaymentMessageStub.value,
    quantity: PaymentQuantityStub.value,
  };
  t.context.payment = PaymentStub;
});

test('should throw debt not found', async t => {
  // Given
  const queryRepository = Substitute.for<PaymentQueryRepository>();
  queryRepository.ofDebtId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({
    queryRepository,
  });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw debt invalid quantity', async t => {
  // Given
  const queryRepository = Substitute.for<PaymentQueryRepository>();
  queryRepository.ofDebtId(Arg.any()).returns(
    fromEither(
      right(
        generatePaymentDebtStub({
          quantity: paymentDebtQuantityVO(0),
        }),
      ),
    ),
  );
  const handler = helper.handler({
    queryRepository,
  });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw pay invalid quantity', async t => {
  // Given
  const queryRepository = Substitute.for<PaymentQueryRepository>();
  queryRepository
    .ofDebtId(Arg.any())
    .returns(fromEither(right(PaymentDebtStub)));
  const handler = helper.handler({
    queryRepository,
  });
  const command = helper.command({
    ...t.context.data,
    quantity: 0,
  });
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should pay correctly', async t => {
  // Given
  const commandRepository = Substitute.for<PaymentCommandRepository>();
  commandRepository.create(Arg.any()).returns(Promise.resolve());
  const eventPublisher = Substitute.for<EventPublisher>();
  eventPublisher.publish().returns(Promise.resolve());
  const queryRepository = Substitute.for<PaymentQueryRepository>();
  queryRepository
    .ofDebtId(Arg.any())
    .returns(fromEither(right(PaymentDebtStub)));
  const handler = helper.handler({
    commandRepository,
    eventPublisher,
    queryRepository,
  });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.notThrowsAsync(fn);
});
