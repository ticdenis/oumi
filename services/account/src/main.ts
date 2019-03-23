import { Oumi } from '@oumi-package/core/lib';

import 'reflect-metadata';

import {
  Environment,
  loadApplication,
  loadContainer,
  loadEnvironment,
  loadLogger,
  loadReadDatabase,
  loadWriteDatabase,
  SERVICE_ID,
} from './config';

export interface MainConstructor {
  appLoader: (container: Oumi.Container) => Promise<Oumi.Application>;
  containerLoader: () => Promise<Oumi.Container>;
  envLoader: () => Promise<Environment>;
  loggerLoader: (container: Oumi.Container) => Promise<Oumi.Logger>;
  readDBLoader: (env: Environment) => Promise<Oumi.Database>;
  writeDBLoader: (env: Environment) => Promise<Oumi.Database>;
}

export async function main({
  appLoader,
  containerLoader,
  envLoader,
  loggerLoader,
  readDBLoader,
  writeDBLoader,
}: MainConstructor) {
  const container = await containerLoader();

  const env = await envLoader();
  container.set<Environment>(SERVICE_ID.ENV, env);

  const readDB = await readDBLoader(env);
  await readDB.connect();
  container.set<Oumi.Database>(SERVICE_ID.DB.READ, readDB);

  const writeDB = await writeDBLoader(env);
  await writeDB.connect();
  container.set<Oumi.Database>(SERVICE_ID.DB.WRITE, writeDB);

  const logger = await loggerLoader(container);
  container.set<Oumi.Logger>(SERVICE_ID.LOGGER, logger);

  const app = await appLoader(container);
  app.listen(parseInt(env.APP_PORT, 0), '0.0.0.0', () =>
    logger.log(`Listening at http://localhost:${env.APP_PORT}`),
  );
}

if (require.main === module) {
  main({
    appLoader: container => Promise.resolve(loadApplication(container)),
    containerLoader: () => Promise.resolve(loadContainer()),
    envLoader: () => Promise.resolve(loadEnvironment()),
    loggerLoader: container => Promise.resolve(loadLogger(container)),
    readDBLoader: env => Promise.resolve(loadReadDatabase(env)),
    writeDBLoader: env => Promise.resolve(loadWriteDatabase(env)),
  })
    // tslint:disable-next-line: no-console
    .catch(console.error);
}
