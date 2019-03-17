import winston from 'winston';

import { Environment, LoggerLoader, SERVICE_ID } from '../dsl';

export const loggerLoader: LoggerLoader = container => {
  const isCI = !!container.get<Environment>(SERVICE_ID.ENV).CI;

  const logger = winston.createLogger({
    defaultMeta: { service: 'account' },
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.json(),
    ),
    silent: isCI,
    transports: isCI
      ? []
      : [
          new winston.transports.Console({
            level: 'info',
          }),
        ],
  });

  return Promise.resolve({
    log: logger.info.bind(logger),
  });
};
