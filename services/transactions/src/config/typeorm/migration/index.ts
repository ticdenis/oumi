import { DomainEvents1562505230000 } from './1562505230000-domain-events';
import { Currencies1562505259000 } from './1562505259000-currencies';
import { InsertCurrencies1562505278000 } from './1562505278000-insert-currencies';
import { DebtStatuses1562505304000 } from './1562505304000-debt-statuses';
import { InsertDebtStatuses1562505317000 } from './1562505317000-insert-debt-statuses';
import { Users1562505333000 } from './1562505333000-users';
import { Debts1562505344000 } from './1562505344000-debts';
import { DebtsLoaners1562505355000 } from './1562505355000-debts-loaners';
import { DebtsDebtors1562505404000 } from './1562505404000-debts-debtors';
import { Payments1562505417000 } from './1562505417000-payments';

export const MIGRATIONS = [
  new DomainEvents1562505230000(),
  new Currencies1562505259000(),
  new InsertCurrencies1562505278000(),
  new DebtStatuses1562505304000(),
  new InsertDebtStatuses1562505317000(),
  new Users1562505333000(),
  new Debts1562505344000(),
  new DebtsLoaners1562505355000(),
  new DebtsDebtors1562505404000(),
  new Payments1562505417000()
];
