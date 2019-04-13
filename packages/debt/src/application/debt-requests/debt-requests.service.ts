import { Either, left, right } from 'fp-ts/lib/Either';

import { DebtDebtor, DebtDomainError, DebtQueryRepository } from '../../domain';

import { DebtRequestsResponse } from '.';
import { debtRequestsTransformer } from './debt-requests.response';

export type DebtRequestsService = (input: {
  debtorId: DebtDebtor['id'];
}) => Promise<Either<DebtDomainError, DebtRequestsResponse>>;

export type DebtRequestsBuilder = (options: {
  queryRepository: DebtQueryRepository;
}) => DebtRequestsService;

export const debtRequestsBuilderService: DebtRequestsBuilder = ({
  queryRepository,
}) => async input => {
  const debtorExists = await queryRepository.debtorExists(input.debtorId);

  if (!debtorExists) {
    return left(DebtDomainError.debtorNotFound(input.debtorId.value));
  }

  const pendingRequests = await queryRepository.pendingRequestsOfDebtorId(
    input.debtorId,
  );

  return right(debtRequestsTransformer(pendingRequests));
};
