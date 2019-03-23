import { Oumi } from '@oumi-package/core';

import { QueryRunner } from 'typeorm';

import { CreateUsersTable } from './0001-create-users-table';

export const WRITE_MIGRATIONS: Oumi.Migration<QueryRunner>[] = [
  new CreateUsersTable(),
];
