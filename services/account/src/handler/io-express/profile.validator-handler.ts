import { profileValidator } from '../../validator/io';

import { simpleParamsValidatorHandler } from './util';

export const profileValidatorHandler = simpleParamsValidatorHandler(
  profileValidator,
);
