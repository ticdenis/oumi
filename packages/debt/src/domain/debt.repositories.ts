import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import { TaskEither } from 'fp-ts/lib/TaskEither';

import { Debt, DebtorId, LoanerId } from './';

export interface DebtCommandRepository {
  confirmDebtRequest(debt: Debt): Promise<void>;
  create(debt: Debt): Promise<void>;
  denyDebtRequest(debt: Debt): Promise<void>;
}

export interface DebtQueryRepository {
  debtorExists(id: DebtorId): Promise<boolean>;
  loanerExists(id: LoanerId): Promise<boolean>;
  ofId(id: DebtId): TaskEither<null, Debt>;
  pendingRequestsOfDebtorId(id: DebtorId): Promise<Debt[]>;
}
