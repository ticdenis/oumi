import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

import { DomainEvents_002 } from './002-domain-events';
import { Users_003 } from './003-users';
import { Contacts_004 } from './004-contacts';
import { Debts_005 } from './005-debts';

export const MIGRATIONS: Oumi.Migration<QueryRunner>[] = [
  new DomainEvents_002(),
  new Users_003(),
  new Contacts_004(),
  new Debts_005(),
];
