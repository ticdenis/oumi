import * as dotenv from 'dotenv';
import * as R from 'ramda';

import { Environment } from '..';

export const loadEnvironment = (): Environment => {
  const raw = R.mergeDeepRight(
    (() => {
      try {
        const output = dotenv.load({
          path: `${__dirname}/../../../.env`,
        });
        return output.error ? {} : output.parsed;
      } catch (err) {
        return {};
      }
    })(),
    process.env,
  );

  return R.pickAll<any, Environment>(
    [
      'APP_PORT',
      'CI',
      'NODE_ENV',
      'READ_DATABASE_CONNECTION',
      'READ_DATABASE_DATABASE',
      'READ_DATABASE_ENTITIES',
      'READ_DATABASE_HOST',
      'READ_DATABASE_PASSWORD',
      'READ_DATABASE_PORT',
      'READ_DATABASE_SYNCHRONIZE',
      'READ_DATABASE_USERNAME',
      'WRITE_DATABASE_CONNECTION',
      'WRITE_DATABASE_DATABASE',
      'WRITE_DATABASE_ENTITIES',
      'WRITE_DATABASE_HOST',
      'WRITE_DATABASE_PASSWORD',
      'WRITE_DATABASE_PORT',
      'WRITE_DATABASE_SYNCHRONIZE',
      'WRITE_DATABASE_USERNAME',
    ],
    raw,
  );
};
