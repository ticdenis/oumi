import { Either } from 'fp-ts/lib/Either';

import {
  PaymentDebtUserId,
  PaymentDomainError,
  PaymentQueryRepository,
} from '../../domain';

import { PaymentsResponse, paymentsTransformer } from '.';

export type PaymentsService = (input: {
  debtorId: PaymentDebtUserId;
}) => Promise<Either<PaymentDomainError, PaymentsResponse>>;

export type PaymentsBuilder = (options: {
  queryRepository: PaymentQueryRepository;
}) => PaymentsService;

export const paymentsBuilderService: PaymentsBuilder = ({
  queryRepository,
}) => input =>
  queryRepository
    .allOfId(input.debtorId)
    .mapLeft(() => PaymentDomainError.debtNotFound(input.debtorId.value))
    .map(paymentsTransformer)
    .run();
