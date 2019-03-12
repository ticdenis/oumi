export interface Environment {
  APP_PORT: string;
}

export type EnvironmentLoader = () => Promise<Environment>;

export type ServiceId = string | symbol;

export interface Container {
  get<T>(id: ServiceId): T | null;
  set<T>(id: ServiceId, value: T): void;
}

export type ContainerLoader = () => Promise<Container>;

export type Controller<T> = (container: Container) => T;

export interface Logger {
  log(message: string): void;
}

export type LoggerLoader = (container: Container) => Promise<Logger>;

export interface Application {
  listen<T>(port: number, hostname: string, callback?: () => void): T;
}

export type ApplicationLoader = (container: Container) => Promise<Application>;

export type Database = any; // TODO

export type DatabaseLoader = (env: Environment) => Promise<Database>;

export interface MainArgs {
  app: Application;
  container: Container;
  db: Database;
  env: Environment;
  logger: Logger;
}
