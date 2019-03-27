import { userTokenValidator } from '../../validator/io';

import { simpleValidatorHandler } from './util';

export const userTokenValidatorHandler = simpleValidatorHandler(
  userTokenValidator,
);
