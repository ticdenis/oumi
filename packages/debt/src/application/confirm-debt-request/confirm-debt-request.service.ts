import { EventPublisher } from '@oumi-package/core/lib';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  DebtCommandRepository,
  DebtDomainError,
  DebtQueryRepository,
} from '../../domain';

export type ConfirmDebtRequestService = (input: {
  id: DebtId;
}) => Promise<Either<DebtDomainError, void>>;

export type ConfirmDebtRequestBuilder = (options: {
  commandRepository: DebtCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: DebtQueryRepository;
}) => ConfirmDebtRequestService;

export const confirmDebtRequestBuilderService: ConfirmDebtRequestBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const debt = await queryRepository.ofId(input.id).run();

  if (debt.isLeft()) {
    return left(DebtDomainError.debtNotExists(input.id.value));
  }

  try {
    debt.value.confirmRequest();
  } catch (err) {
    return left(err);
  }

  await commandRepository.confirmDebtRequest(debt.value);

  await eventPublisher.publish(...debt.value.pullDomainEvents());

  return right(constVoid());
};
