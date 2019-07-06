import dotenv from 'dotenv';
import * as R from 'ramda';

import { Environment } from '..';

export const loadEnvironment = (): Environment => {
  const raw = R.merge(
    (() => {
      try {
        const output = dotenv.config();
        return output.error ? {} : output.parsed;
      } catch (err) {
        return {};
      }
    })(),
    process.env,
  );

  return (raw as unknown) as Environment;
};
