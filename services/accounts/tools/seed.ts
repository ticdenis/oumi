#!/usr/bin/env ts-node

import * as shell from 'shelljs';
import { Connection } from 'typeorm';

import { SEEDERS } from '../src/config/typeorm/seed';

import { loadDatabase, loadEnvironment } from './../src/config';
import { migrator } from './../src/config/typeorm/migrator';

async function run() {
  const env = loadEnvironment();

  shell.echo('Seeding DATABASE…');

  const connection = await loadDatabase(env).connect<Connection>();

  await migrator.migrate(connection)(SEEDERS);

  shell.echo('Finishing seeding…');
}

run()
  .then(() => shell.exit(0))
  .catch(err => {
    shell.echo(err);
    shell.exit(1);
  });
