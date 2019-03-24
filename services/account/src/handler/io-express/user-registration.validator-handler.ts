import { userRegistrationValidator } from '../../validator/io';

import { simpleValidatorHandler } from '.';

export const userRegistrationValidatorHandler = simpleValidatorHandler(
  userRegistrationValidator,
);
