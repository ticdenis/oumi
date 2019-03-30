import { userTokenValidator } from '../../validator/io';

import { simpleBodyValidatorHandler } from './util';

export const userTokenValidatorHandler = simpleBodyValidatorHandler(
  userTokenValidator,
);
