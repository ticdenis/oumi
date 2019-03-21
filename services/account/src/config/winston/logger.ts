import { Oumi } from '@oumi-package/core';

import winston from 'winston';

import { Environment, SERVICE_ID } from '..';

export const loadLogger = (container: Oumi.Container): Oumi.Logger => {
  const isCI = !!container.get<Environment>(SERVICE_ID.env).CI;

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

  return {
    log: logger.info.bind(logger),
  };
};
