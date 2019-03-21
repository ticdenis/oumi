import { Errors } from 'io-ts';

// tslint:disable-next-line: no-namespace
export declare namespace Oumi {
  export interface Environment {
    NODE_ENV: string;
  }

  export type ServiceId<T> =
    | string
    | symbol
    | (new (...args: any[]) => T)
    | {
        prototype: T;
      };

  export interface Container {
    getAsync: <T>(id: Oumi.ServiceId<T>) => Promise<T | null>;
    get<T>(id: Oumi.ServiceId<T>): T | null;
    set<T>(id: Oumi.ServiceId<T>, value: T): void;
    setAsync<T>(
      id: Oumi.ServiceId<T>,
      fn: (context: any) => T | Promise<T>,
    ): void;
  }

  export type Controller<T> = (container: Container) => T;

  export interface Logger {
    log(message: string): void;
  }

  export interface Application {
    listen<T>(port: number, hostname: string, callback?: () => void): T;
  }

  export interface Database {
    connect: <T>() => Promise<T>;
    isConnected: () => Promise<boolean>;
    disconnect: () => Promise<void>;
  }

  export interface ErrorFormat {
    code: string;
    message: string;
  }

  export interface JSONResponse<D, E = ErrorFormat> {
    data: D | null;
    errors: E[] | null;
  }
}

export const okResponse = <D>(data: D = null): Oumi.JSONResponse<D, null> => ({
  data,
  errors: null,
});

export const koResponse = <E = Oumi.ErrorFormat>(
  errors: E[] = null,
): Oumi.JSONResponse<null, E> => ({
  data: null,
  errors,
});

export const validationReporter = (errors: Errors): Oumi.ErrorFormat[] =>
  errors.map(error => ({
    code: 'validation_error',
    message: `Expected type '${
      error.context[error.context.length - 1].type.name
    }' on '${
      error.context[error.context.length - 1].key
    }' field, found '${JSON.stringify(error.value)}'.`,
  }));
