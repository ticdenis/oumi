import * as dotenv from 'dotenv';
import * as R from 'ramda';

import { Environment, EnvironmentLoader } from '../dsl';

export const environmentLoader: EnvironmentLoader = () => {
  const raw = R.mergeDeepRight(
    R.defaultTo(dotenv.load().parsed, {}),
    process.env,
  );

  const env = R.pickAll<any, Environment>(
    [
      'APP_PORT',
      'CI',
      'DATABASE_CONNECTION',
      'DATABASE_DATABASE',
      'DATABASE_ENTITIES',
      'DATABASE_HOST',
      'DATABASE_PASSWORD',
      'DATABASE_PORT',
      'DATABASE_SYNCHRONIZE',
      'DATABASE_USERNAME',
      'NODE_ENV',
    ],
    raw,
  );

  return Promise.resolve(env);
};
