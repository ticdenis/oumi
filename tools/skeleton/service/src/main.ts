
import 'reflect-metadata';

import {
  Environment
} from './config';

export interface MainConstructor {
  envLoader: () => Promise<Environment>;
}

export async function main({
  envLoader,
}: MainConstructor) {
  const env = await envLoader();

  // tslint:disable-next-line: no-console
  console.log('env', env);
}

if (require.main === module) {
  main({
    envLoader: () => Promise.resolve({}),
  })
    // tslint:disable-next-line: no-console
    .catch(console.error);
}
