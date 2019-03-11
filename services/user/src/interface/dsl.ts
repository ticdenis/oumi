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

export interface Application<T> {
  listen(port: number, hostname: string, callback?: () => void): T;
}

export type ApplicationLoader<T> = (
  env: Environment,
  container: Container,
) => Promise<Application<T>>;

export interface Logger {
  log(message: string): void;
}
