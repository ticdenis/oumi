#!/usr/bin/env ts-node

import { argv } from 'process';
import * as shell from 'shelljs';
import { Connection } from 'typeorm';

import { loadDatabase, loadEnvironment } from '../src/config';
import { MIGRATIONS } from '../src/config/typeorm/migration';
import { migrator } from '../src/config/typeorm/migrator';

async function run(option?: string) {
  if (!option || !['migrate', 'rollback'].includes(option)) {
    throw Error('You need specify "migrate" or "rollback"!');
  }

  const env = loadEnvironment();

  shell.echo('Migrating DATABASE…');
  shell.echo();

  const connection = await loadDatabase(env).connect<Connection>();

  if (option === 'migrate') {
    await migrator.migrate(connection)(MIGRATIONS);
  } else {
    await migrator.rollback(connection)(MIGRATIONS);
  }

  shell.echo();
  shell.echo('Finishing migrating…');
}

run(argv[2])
  .then(() => shell.exit(0))
  .catch(err => {
    // tslint:disable-next-line: no-console
    console.error(err);
    shell.exit(1);
  });
