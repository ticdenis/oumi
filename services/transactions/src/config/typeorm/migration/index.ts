import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

import { DomainEvents_001 } from './001-domain-events';
import { Currencies_002 } from './002-currencies';
import { DebtStatuses_003 } from './003-debt-statuses';
import { Users_004 } from './004-users';
import { Debts_005 } from './005-debts';
import { DebtsLoaners_006 } from './006-debts-loaners';
import { DebtsDebtors_007 } from './007-debts-debtors';
import { Payments_008 } from './008-payments';

export const MIGRATIONS: Oumi.Migration<QueryRunner>[] = [
  new DomainEvents_001(),
  new Currencies_002(),
  new DebtStatuses_003(),
  new Users_004(),
  new Debts_005(),
  new DebtsLoaners_006(),
  new DebtsDebtors_007(),
  new Payments_008(),
];
