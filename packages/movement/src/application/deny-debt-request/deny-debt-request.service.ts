import { EventPublisher } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  DebtCommandRepository,
  DebtDomainError,
  DebtQueryRepository,
} from '../../domain';

export type DenyDebtRequestService = (input: {
  id: DebtId;
}) => Promise<Either<DebtDomainError, void>>;

export type DenyDebtRequestBuilder = (options: {
  commandRepository: DebtCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: DebtQueryRepository;
}) => DenyDebtRequestService;

export const denyDebtRequestBuilderService: DenyDebtRequestBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const debt = await queryRepository.ofId(input.id).run();

  if (debt.isLeft()) {
    return left(DebtDomainError.debtNotExists(input.id.value));
  }

  try {
    debt.value.denyRequest();
  } catch (err) {
    return left(err);
  }

  await commandRepository.denyDebtRequest(debt.value);

  await eventPublisher.publish(...debt.value.pullDomainEvents());

  return right(constVoid());
};
