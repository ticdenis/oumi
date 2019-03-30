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
  TOKEN_SECRET: string;
  TOKEN_ISSUER: string;
  TOKEN_EXPIRATION_DAYS: string;
  WRITE_DATABASE_CONNECTION: string;
  WRITE_DATABASE_DATABASE: string;
  WRITE_DATABASE_ENTITIES: string;
  WRITE_DATABASE_HOST: string;
  WRITE_DATABASE_PASSWORD: string;
  WRITE_DATABASE_PORT: string;
  WRITE_DATABASE_SYNCHRONIZE: string;
  WRITE_DATABASE_USERNAME: string;
}
export declare const SERVICE_ID: {
  BUS: {
    COMMAND: symbol;
    QUERY: symbol;
  };
  COMMAND_REPOSITORY: {
    USER: symbol;
  };
  DB: {
    READ: symbol;
    WRITE: symbol;
  };
  ENV: symbol;
  EVENT_PUBLISHER: symbol;
  EVENT_SUBSCRIBER: symbol;
  LOGGER: symbol;
  QUERY_REPOSITORY: {
    USER: symbol;
  };
  TOKEN_FACTORY: symbol;
  TOKEN_READER: symbol;
  USER_ID: symbol;
};
export * from './express/application';
export * from './inversify/container';
export * from './typeorm/database';
export * from './dotenv/environment';
export * from './winston/logger';
//# sourceMappingURL=index.d.ts.map
