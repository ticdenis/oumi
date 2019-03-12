import { LoggerLoader } from '../dsl';

export const loggerLoader: LoggerLoader = () => {
  return Promise.resolve({
    // tslint:disable-next-line:no-console
    log: console.log,
  });
};
