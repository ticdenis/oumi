import { Errors } from 'io-ts';

import { DomainError } from '../domain';

// tslint:disable-next-line: no-namespace
export declare namespace Oumi {
  export interface Environment {
    NODE_ENV: string;
  }

  export type ServiceId = string | symbol;

  export interface Container {
    getAsync: <T>(id: Oumi.ServiceId) => Promise<T | null>;
    get<T>(id: Oumi.ServiceId): T | null;
    set<T>(id: Oumi.ServiceId, value: T): void;
    setAsync<T>(
      id: Oumi.ServiceId,
      fn: <C = any>(context: C) => T | Promise<T>,
    ): void;
  }

  export type Validator<T> = (data?: any) => T;

  export type Controller<T> = (container: Container) => T;

  export type Handler<T> = (container: Container) => T;

  export interface Logger {
    log(message: string): void;
  }

  export interface Application {
    listen<T>(port: number, hostname: string, callback?: () => void): T;
  }

  export interface Database {
    connect: <T>() => Promise<T>;
    connection: <T>() => T | null;
    isConnected: () => Promise<boolean>;
    disconnect: () => Promise<void>;
  }

  export interface Migration<T> {
    down: (queryRunner: T) => Promise<void>;
    up: (queryRunner: T) => Promise<void>;
  }

  export interface Migrator<Connection, QueryRunner> {
    migrate: (
      connection: Connection,
    ) => (migrations: Migration<QueryRunner>[]) => Promise<void>;
    rollback: (
      connection: Connection,
    ) => (migrations: Migration<QueryRunner>[]) => Promise<void>;
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

export const koResponse = (
  errors: Oumi.ErrorFormat[] | DomainError[] | Error[] = null,
): Oumi.JSONResponse<null, Oumi.ErrorFormat> => ({
  data: null,
  errors: !errors
    ? null
    : (errors as any[]).map(err =>
        err instanceof DomainError
          ? { code: err.code, message: err.message }
          : err instanceof Error
          ? {
              code: err.hasOwnProperty('code') ? (err as any).code : err.name,
              message: err.message,
              meta: err,
            }
          : err,
      ),
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
