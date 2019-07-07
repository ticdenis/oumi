import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

import { DomainEvents_002 } from './002-domain-events';
import { Currencies_003 } from './003-currencies';
import { DebtStatuses_004 } from './004-debt-statuses';
import { Users_005 } from './005-users';
import { Debts_006 } from './006-debts';
import { DebtsLoaners_007 } from './007-debts-loaners';
import { DebtsDebtors_008 } from './008-debts-debtors';
import { Payments_009 } from './009-payments';

export const MIGRATIONS: Oumi.Migration<QueryRunner>[] = [
  new DomainEvents_002(),
  new Currencies_003(),
  new DebtStatuses_004(),
  new Users_005(),
  new Debts_006(),
  new DebtsLoaners_007(),
  new DebtsDebtors_008(),
  new Payments_009(),
];
