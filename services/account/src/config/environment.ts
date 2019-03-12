import * as dotenv from 'dotenv';
import * as R from 'ramda';

import { Environment, EnvironmentLoader } from '../dsl';

export const environmentLoader: EnvironmentLoader = () => {
  const raw = R.mergeDeepRight(
    R.defaultTo(dotenv.load().parsed, {}),
    process.env,
  );

  const env = R.pickAll<any, Environment>(['APP_PORT'], raw);

  return Promise.resolve(env);
};
