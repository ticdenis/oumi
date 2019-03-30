import { userRegistrationValidator } from '../../validator/io';

import { simpleBodyValidatorHandler } from './util';

export const userRegistrationValidatorHandler = simpleBodyValidatorHandler(
  userRegistrationValidator,
);
