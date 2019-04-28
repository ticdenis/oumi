import { EventPublisher } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  DebtCommandRepository,
  DebtDomainError,
  DebtQueryRepository,
} from '../../domain';

export type EndDebtService = (input: {
  id: DebtId;
}) => Promise<Either<DebtDomainError, void>>;

export type EndDebtBuilder = (options: {
  commandRepository: DebtCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: DebtQueryRepository;
}) => EndDebtService;

export const endDebtBuilderService: EndDebtBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const debt = await queryRepository.ofId(input.id).run();

  if (debt.isLeft()) {
    return left(DebtDomainError.debtNotExists(input.id.value));
  }

  try {
    debt.value.endDebt();
  } catch (err) {
    return left(err);
  }

  await commandRepository.endDebt(debt.value);

  await eventPublisher.publish(...debt.value.pullDomainEvents());

  return right(constVoid());
};
