import { Oumi } from '@oumi-package/shared/lib/core';
import 'reflect-metadata';
import { Environment } from './config';
export interface MainConstructor {
    appLoader: (container: Oumi.Container) => Promise<Oumi.Application>;
    containerLoader: () => Promise<Oumi.Container>;
    dbLoader: (env: Environment) => Promise<Oumi.Database>;
    envLoader: () => Promise<Environment>;
    loggerLoader: (container: Oumi.Container) => Promise<Oumi.Logger>;
}
export declare function main({ appLoader, containerLoader, dbLoader, envLoader, loggerLoader, }: MainConstructor): Promise<void>;
//# sourceMappingURL=main.d.ts.map