import { argv } from 'process';
import 'reflect-metadata';
import * as shell from 'shelljs';
import { Connection } from 'typeorm';

import { loadDatabase, loadEnvironment } from '..';

async function run(option?: string) {
  if (!option || !['migrate', 'rollback'].includes(option)) {
    throw Error('You need specify "migrate" or "rollback"!');
  }

  const env = loadEnvironment();

  shell.echo('Migrating DATABASE…');
  shell.echo();

  const connection = await loadDatabase(env).connect<Connection>();

  connection.query(`CREATE SCHEMA IF NOT EXISTS accounts`);
  (connection.options as any).schema = 'accounts';

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
