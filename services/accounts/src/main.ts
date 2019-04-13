import { Oumi } from '@oumi-package/core/lib';

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
  dbLoader: (env: Environment) => Promise<Oumi.Database>;
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
  container.set<Environment>(SERVICE_ID.ENV, env);

  const db = await dbLoader(env);
  await db.connect();
  container.set<Oumi.Database>(SERVICE_ID.DB, db);

  const logger = await loggerLoader(container);
  container.set<Oumi.Logger>(SERVICE_ID.LOGGER, logger);

  const app = await appLoader(container);
  app.listen(parseInt(env.APP_PORT, 0), '0.0.0.0', () =>
    logger.log(`Listeningggggg at http://localhost:${env.APP_PORT}`),
  );

  process.on('uncaughtException', err => {
    logger.log(`Uncaught exception: ${err}`);
    process.exit(1);
  });
}

if (require.main === module) {
  main({
    appLoader: container => Promise.resolve(loadApplication(container)),
    containerLoader: () => Promise.resolve(loadContainer()),
    dbLoader: env => Promise.resolve(loadDatabase(env)),
    envLoader: () => Promise.resolve(loadEnvironment()),
    loggerLoader: container => Promise.resolve(loadLogger(container)),
  })
    // tslint:disable-next-line: no-console
    .catch(console.error);
}
