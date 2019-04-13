import { Oumi } from '@oumi-package/core/lib';

export interface Environment extends Oumi.Environment {
  APP_PORT: string;
  CI: string | undefined;
  DATABASE_CONNECTION: string;
  DATABASE_DATABASE: string;
  DATABASE_ENTITIES: string;
  DATABASE_HOST: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT: string;
  DATABASE_SYNCHRONIZE: string;
  DATABASE_USERNAME: string;
  TOKEN_SECRET: string;
  TOKEN_ISSUER: string;
  TOKEN_EXPIRATION_DAYS: string;
}

export const SERVICE_ID = {
  BUS: {
    COMMAND: Symbol.for('COMMAND_BUS_SERVICE_ID'),
    QUERY: Symbol.for('QUERY_BUS_SERVICE_ID'),
  },
  COMMAND_REPOSITORY: {
    USER: Symbol.for('USER_COMMAND_REPOSITORY_SERVICE_ID'),
  },
  DB: Symbol.for('DB_SERVICE_ID'),
  DOMAIN_EVENT_REPOSITORY: Symbol.for('DOMAIN_EVENT_REPOSITORY_SERVICE_ID'),
  ENV: Symbol.for('ENV_SERVICE_ID'),
  EVENT_PUBLISHER: Symbol.for('EVENT_PUBLISHER_SERVICE_ID'),
  EVENT_SUBSCRIBER: Symbol.for('EVENT_SUBSCRIBER_SERVICE_ID'),
  LOGGER: Symbol.for('LOGGER_SERVICE_ID'),
  QUERY_REPOSITORY: {
    CONTACT: Symbol.for('CONTACT_QUERY_REPOSITORY_SERVICE_ID'),
    USER: Symbol.for('USER_QUERY_REPOSITORY_SERVICE_ID'),
  },
  TOKEN_FACTORY: Symbol.for('TOKEN_FACTORY_SERVICE_ID'),
  TOKEN_READER: Symbol.for('TOKEN_READER_SERVICE_ID'),
  USER_ID: Symbol.for('USER_ID_SERVICE_ID'),
};

export * from './express/application';
export * from './inversify/container';
export * from './typeorm/database';
export * from './dotenv/environment';
export * from './winston/logger';