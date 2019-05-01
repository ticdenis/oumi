import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

import { DomainEvents_001 } from './001-domain-events';
import { Users_002 } from './002-users';
import { Contacts_003 } from './003-contacts';
import { Debts_004 } from './004-debts';

export const MIGRATIONS: Oumi.Migration<QueryRunner>[] = [
  new DomainEvents_001(),
  new Users_002(),
  new Contacts_003(),
  new Debts_004(),
];
