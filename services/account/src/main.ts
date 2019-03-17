import 'reflect-metadata';

import {
  appLoader,
  containerLoader,
  dbLoader,
  environmentLoader,
  loggerLoader,
} from './config';
import { Database, Environment, Logger, MainArgs, SERVICE_ID } from './dsl';

export async function main(args?: Partial<MainArgs>) {
  const container = await containerLoader();

  const env = (args || {}).env || (await environmentLoader());
  container.set<Environment>(SERVICE_ID.ENV, env);

  const db = (args || {}).db || (await dbLoader(env));
  container.set<Database>(SERVICE_ID.DB, db);

  const logger = (args || {}).logger || (await loggerLoader(container));
  container.set<Logger>(SERVICE_ID.LOGGER, logger);

  const app = (args || {}).app || (await appLoader(container));
  app.listen(parseInt(env.APP_PORT, 0), '0.0.0.0', () =>
    logger.log(`Listening at http://localhost:${env.APP_PORT}`),
  );
}

if (require.main === module) {
  main();
}
