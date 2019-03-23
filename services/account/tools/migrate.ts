#!/usr/bin/env ts-node

import * as shell from 'shelljs';

import {
  loadEnvironment,
  loadReadDatabase,
  loadWriteDatabase,
} from './../src/config';
import { READ_MIGRATIONS } from './../src/config/typeorm/migration/read';
import { WRITE_MIGRATIONS } from './../src/config/typeorm/migration/write';
import { migrator } from './../src/config/typeorm/migrator';

async function run() {
  const env = loadEnvironment();

  shell.echo('Migrating READ-DATABASE…');

  await migrator.migrate(await loadReadDatabase(env).connect())(
    READ_MIGRATIONS,
  );

  shell.echo('Finishing migrating…');

  shell.echo('Migrating WRITE-DATABASE…');

  await migrator.migrate(await loadWriteDatabase(env).connect())(
    WRITE_MIGRATIONS,
  );

  shell.echo('Finishing migrating…');
}

run()
  .then(() => shell.exit(0))
  .catch(err => {
    shell.echo(err);
    shell.exit(1);
  });
