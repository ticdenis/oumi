import { Oumi } from '@oumi-package/shared/lib/core';
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
export declare const SERVICE_ID: {
    BUS: {
        SYNC_COMMAND: symbol;
        SYNC_QUERY: symbol;
    };
    COMMAND_REPOSITORY: {
        DEBT: symbol;
    };
    DB: symbol;
    DOMAIN_EVENT_REPOSITORY: symbol;
    ENV: symbol;
    EVENT_PUBLISHER: symbol;
    EVENT_SUBSCRIBER: symbol;
    LOGGER: symbol;
    QUERY_REPOSITORY: {
        DEBT: symbol;
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