#!/usr/bin/env ts-node

import * as shell from 'shelljs';

import { CreateUsersTable } from '../src/config/typeorm/migration/0001-create-users-table';

import { loadDatabase, loadEnvironment } from './../src/config';
import { migrator } from './../src/config/typeorm/migrator';

async function run() {
  const env = loadEnvironment();

  shell.echo('Migrating DATABASE…');

  await migrator.migrate(await loadDatabase(env).connect())([
    new CreateUsersTable(),
  ]);

  shell.echo('Finishing migrating…');
}

run()
  .then(() => shell.exit(0))
  .catch(err => {
    shell.echo(err);
    shell.exit(1);
  });
