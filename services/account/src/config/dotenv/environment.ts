import * as dotenv from 'dotenv';
import * as R from 'ramda';

import { Environment } from '..';

export const loadEnvironment = (): Environment => {
  const raw = R.mergeDeepRight(
    R.defaultTo(dotenv.load().parsed, {}),
    process.env,
  );

  return R.pickAll<any, Environment>(
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
};
