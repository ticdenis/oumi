import {
  appLoader,
  containerLoader,
  dbLoader,
  environmentLoader,
  loggerLoader,
} from './config';
import { MainArgs } from './dsl';

export async function main(args?: Partial<MainArgs>) {
  const container = (args || {}).container || (await containerLoader());

  const env = (args || {}).env || (await environmentLoader());
  container.set('env', env);

  const db = (args || {}).db || (await dbLoader(env));
  container.set('db', db);

  const logger = (args || {}).logger || (await loggerLoader(container));
  container.set('logger', logger);

  const app = (args || {}).app || (await appLoader(container));
  app.listen<any>(parseInt(env.APP_PORT, 0), '0.0.0.0', () =>
    logger.log(`Listening at http://localhost:${env.APP_PORT}`),
  );
}

if (require.main === module) {
  main();
}
