import { userRegistrationValidator } from '../../validator/io';

import { simpleValidatorHandler } from './util';

export const userRegistrationValidatorHandler = simpleValidatorHandler(
  userRegistrationValidator,
);
