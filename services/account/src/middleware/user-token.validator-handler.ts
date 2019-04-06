import { userTokenValidator } from '../validator';

import { simpleBodyValidatorHandler } from './util';

export const userTokenValidatorHandler = simpleBodyValidatorHandler(
  userTokenValidator,
);
