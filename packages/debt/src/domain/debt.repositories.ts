import { Debt } from './';
import { DebtDebtor, DebtLoaner } from './debt.props';

export interface DebtCommandRepository {
  create(debt: Debt): Promise<void>;
}

export interface DebtQueryRepository {
  debtorExists(id: DebtDebtor['id']): Promise<boolean>;
  loanerExists(id: DebtLoaner['id']): Promise<boolean>;
  pendingRequestsOfDebtorId(id: DebtDebtor['id']): Promise<Debt[]>;
}
