import { Oumi } from '@oumi-package/core/lib';
import 'reflect-metadata';
import { Environment } from './config';
export interface MainConstructor {
  appLoader: (container: Oumi.Container) => Promise<Oumi.Application>;
  containerLoader: () => Promise<Oumi.Container>;
  envLoader: () => Promise<Environment>;
  loggerLoader: (container: Oumi.Container) => Promise<Oumi.Logger>;
  readDBLoader: (env: Environment) => Promise<Oumi.Database>;
  writeDBLoader: (env: Environment) => Promise<Oumi.Database>;
}
export declare function main({
  appLoader,
  containerLoader,
  envLoader,
  loggerLoader,
  readDBLoader,
  writeDBLoader,
}: MainConstructor): Promise<void>;
//# sourceMappingURL=main.d.ts.map
