import { EventPublisher } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  Debt,
  DebtAmount,
  DebtCommandRepository,
  DebtConcept,
  DebtDebtor,
  DebtDomainError,
  DebtIntervalDate,
  DebtLoaner,
  DebtQueryRepository,
} from '../../domain';

export type NewDebtRequestService = (input: {
  amount: DebtAmount;
  concept: DebtConcept;
  debtorId: DebtDebtor['id'];
  id: DebtId;
  intervalDate: DebtIntervalDate;
  loanerId: DebtLoaner['id'];
}) => Promise<Either<DebtDomainError, void>>;

export type NewDebtRequestBuilder = (options: {
  commandRepository: DebtCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: DebtQueryRepository;
}) => NewDebtRequestService;

export const newDebtRequestBuilderService: NewDebtRequestBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const loanerExists = await queryRepository.loanerExists(input.loanerId);

  if (!loanerExists) {
    return left(DebtDomainError.loanerNotFound(input.loanerId.value));
  }

  const debtorExists = await queryRepository.debtorExists(input.debtorId);

  if (!debtorExists) {
    return left(DebtDomainError.debtorNotFound(input.debtorId.value));
  }

  const debt = Debt.newRequest({
    amount: input.amount,
    concept: input.concept,
    debtorId: input.debtorId,
    id: input.id,
    intervalDate: input.intervalDate,
    loanerId: input.loanerId,
  });

  await commandRepository.create(debt);

  await eventPublisher.publish(...debt.pullDomainEvents());

  return right(constVoid());
};
