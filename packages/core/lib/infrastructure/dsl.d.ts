import { Errors } from 'io-ts';
import { DomainError } from '../domain';
export declare namespace Oumi {
    interface Environment {
        NODE_ENV: string;
    }
    type ServiceId = string | symbol;
    interface Container {
        getAsync: <T>(id: Oumi.ServiceId) => Promise<T | null>;
        get<T>(id: Oumi.ServiceId): T | null;
        set<T>(id: Oumi.ServiceId, value: T): void;
        setAsync<T>(id: Oumi.ServiceId, fn: <C = any>(context: C) => T | Promise<T>): void;
    }
    type Validator<T> = (data?: any) => T;
    type Controller<T> = (container: Container) => T;
    type Handler<T> = (container: Container) => T;
    interface Logger {
        log(message: string): void;
    }
    interface Application {
        listen<T>(port: number, hostname: string, callback?: () => void): T;
    }
    interface Database {
        connect: <T>() => Promise<T>;
        connection: <T>() => T | null;
        isConnected: () => Promise<boolean>;
        disconnect: () => Promise<void>;
    }
    interface Migration<T> {
        down: (queryRunner: T) => Promise<void>;
        up: (queryRunner: T) => Promise<void>;
    }
    interface Migrator<Connection, QueryRunner> {
        migrate: (connection: Connection) => (migrations: Migration<QueryRunner>[]) => Promise<void>;
        rollback: (connection: Connection) => (migrations: Migration<QueryRunner>[]) => Promise<void>;
    }
    interface ErrorFormat {
        code: string;
        message: string;
    }
    interface JSONResponse<D, E = ErrorFormat> {
        data: D | null;
        errors: E[] | null;
    }
}
export declare const okResponse: <D>(data?: D) => Oumi.JSONResponse<D, null>;
export declare const koResponse: (errors?: Oumi.ErrorFormat[] | DomainError[] | Error[]) => Oumi.JSONResponse<null, Oumi.ErrorFormat>;
export declare const validationReporter: (errors: Errors) => Oumi.ErrorFormat[];
//# sourceMappingURL=dsl.d.ts.map