import { argv } from 'process';
import 'reflect-metadata';
import * as shell from 'shelljs';
import { Connection } from 'typeorm';

import { loadDatabase, loadEnvironment } from '..';

import { MIGRATIONS } from './migration';
import { Schema1562505000000 } from './migration/1562505000000-schema';

async function run(option?: string) {
  if (!option || !['migrate', 'rollback'].includes(option)) {
    throw Error('You need specify "migrate" or "rollback"!');
  }

  const env = loadEnvironment();

  shell.echo('Migrating DATABASE…');
  shell.echo();

  const connection = await loadDatabase(env).connect<Connection>();

  await new Schema1562505000000().up(connection.createQueryRunner());

  (connection.options as any).schema = Schema1562505000000.SCHEMA_NAME;
  (connection.migrations as any) = MIGRATIONS;

  if (option === 'migrate') {
    await connection.runMigrations();
  } else {
    await connection.undoLastMigration();
  }
}

run(argv[2])
  .then(() => shell.exit(0))
  .catch(err => {
    shell.echo(err);
    shell.exit(1);
  });
