import { Oumi } from '@oumi-package/core';

import 'reflect-metadata';

import {
  Environment,
  loadApplication,
  loadContainer,
  loadDatabase,
  loadEnvironment,
  loadLogger,
  SERVICE_ID,
} from './config';

export interface MainConstructor {
  appLoader: (container: Oumi.Container) => Promise<Oumi.Application>;
  containerLoader: () => Promise<Oumi.Container>;
  dbLoader: (environment: Environment) => Promise<Oumi.Database>;
  envLoader: () => Promise<Environment>;
  loggerLoader: (container: Oumi.Container) => Promise<Oumi.Logger>;
}

export async function main({
  appLoader,
  containerLoader,
  dbLoader,
  envLoader,
  loggerLoader,
}: MainConstructor) {
  const container = await containerLoader();

  const env = await envLoader();
  container.set<Environment>(SERVICE_ID.env, env);

  const db = await dbLoader(env);
  await db.connect();
  container.set<Oumi.Database>(SERVICE_ID.db, db);

  const logger = await loggerLoader(container);
  container.set<Oumi.Logger>(SERVICE_ID.logger, logger);

  const app = await appLoader(container);
  app.listen(parseInt(env.APP_PORT, 0), '0.0.0.0', () =>
    logger.log(`Listening at http://localhost:${env.APP_PORT}`),
  );
}

if (require.main === module) {
  main({
    appLoader: container => Promise.resolve(loadApplication(container)),
    containerLoader: () => Promise.resolve(loadContainer()),
    dbLoader: environment => Promise.resolve(loadDatabase(environment)),
    envLoader: () => Promise.resolve(loadEnvironment()),
    loggerLoader: container => Promise.resolve(loadLogger(container)),
  })
    // tslint:disable-next-line: no-console
    .catch(console.error);
}
