import { Oumi } from '@oumi-package/shared/lib/core';

import { Connection, QueryRunner } from 'typeorm';

import { Schema_000 } from './migration/000-schema';
import { Migrations_001 } from './migration/001-migrations';

export const migrator: Oumi.Migrator<Connection, QueryRunner> = {
  migrate: conn => async migrations => {
    await new Schema_000().up(conn.createQueryRunner());

    if (!(await migrationsTableExists(conn))) {
      await new Migrations_001().up(conn.createQueryRunner());
    }

    const newBatch = (await lastBatch(conn)) + 1;

    const lastMigrations = await getMigrations(conn);

    const promises: Promise<any>[] = [];

    let lastId = lastMigrations[0] ? lastMigrations[0].id : 0;

    migrations
      .filter(
        migration =>
          !lastMigrations.some(
            lastMigration => lastMigration.classname === migration.name,
          ),
      )
      .forEach(migration => {
        promises.push(migration.up(conn.createQueryRunner()));
        promises.push(
          insertMigration(conn)(++lastId, newBatch, migration.name),
        );
      });

    for (const promise of promises) await promise;
  },
  rollback: conn => async migrations => {
    const lastMigrations = await getMigrationsOfBatch(conn)(
      await lastBatch(conn),
    );

    const promises: Promise<any>[] = [];

    migrations
      .filter(migration =>
        lastMigrations.some(
          lastMigration => lastMigration.classname === migration.name,
        ),
      )
      .forEach(migration => {
        promises.push(migration.down(conn.createQueryRunner()));
        promises.push(deleteMigration(conn)(migration.name));
      });

    for (const promise of promises) await promise;
  },
};

const migrationsTableExists = (connection: Connection): Promise<boolean> =>
  connection.createQueryRunner().hasTable('accounts.migrations');

const lastBatch = async (connection: Connection): Promise<number> => {
  const lastMigration = await connection
    .createQueryBuilder()
    .select(['m.batch'])
    .from(`${Schema_000.SCHEMA_NAME}.migrations`, 'm')
    .orderBy('m.batch', 'DESC')
    .limit(1)
    .execute();

  return lastMigration[0] ? +lastMigration[0].batch : 0;
};
const insertMigration = (connection: Connection) => (
  id: number,
  batch: number,
  classname: string,
) => {
  return connection
    .createQueryBuilder()
    .insert()
    .into(`${Schema_000.SCHEMA_NAME}.migrations`)
    .values({
      batch,
      classname,
      executed_at: new Date(),
      id,
    })
    .execute();
};

const deleteMigration = (connection: Connection) => (classname: string) => {
  return connection
    .createQueryBuilder()
    .delete()
    .from(`${Schema_000.SCHEMA_NAME}.migrations`)
    .where('classname = :classname', { classname })
    .execute();
};

const getMigrationsOfBatch = (connection: Connection) => (
  batch: number,
): Promise<{ classname: string }[]> => {
  return connection
    .createQueryBuilder()
    .select(['m.classname'])
    .from(`${Schema_000.SCHEMA_NAME}.migrations`, 'm')
    .where('m.batch = :batch', { batch })
    .orderBy('m.id', 'DESC')
    .execute();
};

const getMigrations = (
  connection: Connection,
): Promise<{ id: number; classname: string }[]> => {
  return connection
    .createQueryBuilder()
    .select(['m.id', 'm.classname'])
    .from(`${Schema_000.SCHEMA_NAME}.migrations`, 'm')
    .execute();
};
