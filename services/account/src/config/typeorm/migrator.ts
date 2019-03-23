import { Oumi } from '@oumi-package/core/lib';

import { Connection, QueryRunner } from 'typeorm';

export const migrator: Oumi.Migrator<Connection, QueryRunner> = {
  migrate: conn => async migrations => {
    await Promise.all(
      migrations.map(migration => migration.up(conn.createQueryRunner())),
    );
  },
  rollback: conn => async migrations => {
    await Promise.all(
      migrations.map(migration => migration.down(conn.createQueryRunner())),
    );
  },
};
