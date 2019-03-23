import { Oumi } from '@oumi-package/core/lib';

export interface Environment extends Oumi.Environment {
  APP_PORT: string;
  CI: string | undefined;
  READ_DATABASE_CONNECTION: string;
  READ_DATABASE_DATABASE: string;
  READ_DATABASE_ENTITIES: string;
  READ_DATABASE_HOST: string;
  READ_DATABASE_PASSWORD: string;
  READ_DATABASE_PORT: string;
  READ_DATABASE_SYNCHRONIZE: string;
  READ_DATABASE_USERNAME: string;
  WRITE_DATABASE_CONNECTION: string;
  WRITE_DATABASE_DATABASE: string;
  WRITE_DATABASE_ENTITIES: string;
  WRITE_DATABASE_HOST: string;
  WRITE_DATABASE_PASSWORD: string;
  WRITE_DATABASE_PORT: string;
  WRITE_DATABASE_SYNCHRONIZE: string;
  WRITE_DATABASE_USERNAME: string;
}

export const SERVICE_ID = {
  BUS: {
    COMMAND: Symbol('COMMAND_BUS_SERVICE_ID'),
    QUERY: Symbol('QUERY_BUS_SERVICE_ID'),
  },
  COMMAND_REPOSITORY: {
    USER: Symbol('USER_COMMAND_REPOSITORY_SERVICE_ID'),
  },
  DB: {
    READ: Symbol('DB_READ_SERVICE_ID'),
    WRITE: Symbol('DB_WRITE_SERVICE_ID'),
  },
  ENV: Symbol('ENV_SERVICE_ID'),
  EVENT_PUBLISHER: Symbol('EVENT_PUBLISHER_SERVICE_ID'),
  EVENT_SUBSCRIBER: Symbol('EVENT_SUBSCRIBER_SERVICE_ID'),
  LOGGER: Symbol('LOGGER_SERVICE_ID'),
  QUERY_REPOSITORY: {
    USER: Symbol('USER_QUERY_REPOSITORY_SERVICE_ID'),
  },
};

export * from './express/application';
export * from './inversify/container';
export * from './typeorm/database';
export * from './dotenv/environment';
export * from './winston/logger';
