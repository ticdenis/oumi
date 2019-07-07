import { DomainEvents1562503974000 } from './1562503974000-domain-events';
import { Users1562503979000 } from './1562503979000-users';
import { Contacts1562503984000 } from './1562503984000-contacts';
import { Debts1562503988000 } from './1562503988000-debts';

export const MIGRATIONS = [
  new DomainEvents1562503974000(),
  new Users1562503979000(),
  new Contacts1562503984000(),
  new Debts1562503988000(),
];
