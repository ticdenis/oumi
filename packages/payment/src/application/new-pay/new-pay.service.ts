import { DomainError, EventPublisher } from '@oumi-package/shared/lib/core';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  Payment,
  PaymentCommandRepository,
  PaymentDebtId,
  PaymentDomainError,
  PaymentId,
  PaymentMessage,
  paymentOcurredOnVO,
  PaymentQuantity,
  PaymentQueryRepository,
} from '../../domain';

export type NewPayService = (input: {
  debtId: PaymentDebtId;
  id: PaymentId;
  message: PaymentMessage;
  quantity: PaymentQuantity;
}) => Promise<Either<DomainError, void>>;

export type NewPayBuilder = (options: {
  commandRepository: PaymentCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: PaymentQueryRepository;
}) => NewPayService;

export const newPayBuilderService: NewPayBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const debt = await queryRepository.ofDebtId(input.debtId).run();

  if (debt.isLeft()) {
    return left(PaymentDomainError.debtNotFound(input.debtId.value));
  }

  const payment = Payment.pay({
    debt: debt.value,
    id: input.id,
    message: input.message,
    occurredOn: paymentOcurredOnVO(new Date()),
    quantity: input.quantity,
  });

  await commandRepository.create(payment);

  await eventPublisher.publish(...payment.pullDomainEvents());

  return right(constVoid());
};
