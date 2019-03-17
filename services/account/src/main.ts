import { Container } from 'inversify';

import { appLoader, dbLoader, environmentLoader, loggerLoader } from './config';
import { Environment, Logger, MainArgs } from './dsl';

export async function main(args?: Partial<MainArgs>) {
  const container = new Container();

  const env = (args || {}).env || (await environmentLoader());
  container.bind<Environment>('env').toConstantValue(env);

  const db = (args || {}).db || (await dbLoader(env));
  container.bind<any>('db').toConstantValue(db);

  const logger = (args || {}).logger || (await loggerLoader(container));
  container.bind<Logger>('logger').toConstantValue(logger);

  const app = (args || {}).app || (await appLoader(container));
  app.listen<any>(parseInt(env.APP_PORT, 0), '0.0.0.0', () =>
    logger.log(`Listening at http://localhost:${env.APP_PORT}`),
  );
}

if (require.main === module) {
  main();
}
