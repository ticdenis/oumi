import {
  appLoader,
  containerLoader,
  dbLoader,
  environmentLoader,
  loggerLoader,
} from './config';
import { Environment, Logger, MainArgs } from './dsl';

export async function main(args?: Partial<MainArgs>) {
  const container = await containerLoader();

  const env = (args || {}).env || (await environmentLoader());
  container.set<Environment>('env', env);

  const db = (args || {}).db || (await dbLoader(env));
  container.set<any>('db', db);

  const logger = (args || {}).logger || (await loggerLoader(container));
  container.set<Logger>('logger', logger);

  const app = (args || {}).app || (await appLoader(container));
  app.listen(parseInt(env.APP_PORT, 0), '0.0.0.0', () =>
    logger.log(`Listening at http://localhost:${env.APP_PORT}`),
  );
}

if (require.main === module) {
  main();
}
