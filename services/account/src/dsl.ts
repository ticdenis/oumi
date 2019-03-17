export interface Environment {
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
  NODE_ENV: string;
}

export type EnvironmentLoader = () => Promise<Environment>;

export type ServiceId = string | symbol;

export interface Container {
  get<T>(id: ServiceId): T | null;
  set<T>(id: ServiceId, value: T): void;
  setAsync<T>(id: ServiceId, fn: (context: any) => T | Promise<T>): void;
}

export type ContainerLoader = () => Promise<Container>;

export type Controller<T> = (container: Container) => T;

export interface Logger {
  log(message: string): void;
}

export type LoggerLoader = (container: Container) => Promise<Logger>;

export interface Application {
  listen<T = any>(port: number, hostname: string, callback?: () => void): T;
}

export type ApplicationLoader = (container: Container) => Promise<Application>;

export type Database = any; // TODO

export type DatabaseLoader = (env: Environment) => Promise<Database>;

export const SERVICE_ID: { [key: string]: ServiceId } = {
  DB: Symbol('DB_SERVICE_ID'),
  ENV: Symbol('ENV_SERVICE_ID'),
  LOGGER: Symbol('LOGGER_SERVICE_ID'),
};

export interface MainArgs {
  app: Application;
  container: Container;
  db: Database;
  env: Environment;
  logger: Logger;
}
