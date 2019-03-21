import { Oumi } from '@oumi-package/core';

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
}

export const SERVICE_ID: { [key: string]: Oumi.ServiceId<any> } = {
  commandBus: Symbol('COMMAND_BUS_SERVICE_ID'),
  db: Symbol('DB_SERVICE_ID'),
  env: Symbol('ENV_SERVICE_ID'),
  eventPublisher: Symbol('EVENT_PUBLISHER_SERVICE_ID'),
  logger: Symbol('LOGGER_SERVICE_ID'),
  queryBus: Symbol('QUERY_BUS_SERVICE_ID'),
  userCommandRepository: Symbol('USER_COMMAND_REPOSITORY_SERVICE_ID'),
  userQueryRepository: Symbol('USER_QUERY_REPOSITORY_SERVICE_ID'),
};

export * from './express/application';
export * from './inversify/container';
export * from './typeorm/database';
export * from './dotenv/environment';
export * from './winston/logger';
