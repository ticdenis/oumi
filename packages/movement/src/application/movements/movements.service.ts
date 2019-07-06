import { Either, left, right } from 'fp-ts/lib/Either';
import * as R from 'ramda';

import {
  DebtDomainError,
  DebtorId,
  DebtQueryRepository,
  movementsVO,
  PaymentDomainError,
  PaymentQueryRepository,
} from '../../domain';

import { MovementsResponse, movementsTransformer } from '.';

export type MovementsService = (input: {
  debtorId: DebtorId;
}) => Promise<Either<DebtDomainError | PaymentDomainError, MovementsResponse>>;

export type MovementsBuilder = (options: {
  debtQueryRepository: DebtQueryRepository;
  paymentQueryRepository: PaymentQueryRepository;
}) => MovementsService;

export const movementsBuilderService: MovementsBuilder = ({
  debtQueryRepository,
  paymentQueryRepository,
}) => async input => {
  const debtorPayments = await paymentQueryRepository
    .allOfId(input.debtorId)
    .run();

  if (debtorPayments.isLeft()) {
    return left(PaymentDomainError.debtNotFound(input.debtorId.value));
  }

  const debtorCharges = await paymentQueryRepository
    .allChargesOfId(input.debtorId)
    .run();

  if (debtorCharges.isLeft()) {
    return left(PaymentDomainError.debtNotFound(input.debtorId.value));
  }

  const debtsIds = R.merge(
    R.map(payment => payment.debt.id, debtorPayments.value),
    R.map(payment => payment.debt.id, debtorCharges.value),
  );

  const debts = await debtQueryRepository.allOfIds(debtsIds).run();

  if (debts.isLeft()) {
    return left(
      DebtDomainError.debtNotExists(
        debtsIds.map(debtId => debtId.value).join(','),
      ),
    );
  }

  const debtConcepts = R.map(R.pick(['id', 'concept']), debts.value);

  const movements = movementsVO({
    charges: debtorCharges.value,
    debtConcepts,
    payments: debtorPayments.value,
  });

  return right(movementsTransformer(movements.value));
};
