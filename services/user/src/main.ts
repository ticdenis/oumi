import { applicationLoader } from './interface/application';
import { containerLoader } from './interface/container';
import {
  ApplicationLoader,
  ContainerLoader,
  EnvironmentLoader,
  Logger,
} from './interface/dsl';
import { environmentLoader } from './interface/environment';

export async function main(args: {
  applicationLoader: ApplicationLoader<any>;
  containerLoader: ContainerLoader;
  environmentLoader: EnvironmentLoader;
  logger: Logger;
}) {
  const env = await args.environmentLoader();
  const container = await args.containerLoader();
  const app = await args.applicationLoader(env, container);
  const logger = args.logger;

  app.listen(parseInt(env.APP_PORT, 0), '0.0.0.0', () => {
    logger.log(`Listening at http://localhost:${env.APP_PORT}`);
  });
}

if (require.main === module) {
  main({
    applicationLoader,
    containerLoader,
    environmentLoader,
    logger: console,
  });
}
