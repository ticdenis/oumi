import { updateProfileValidator } from '../validator';

import { simpleBodyValidatorHandler } from './util';

export const updateProfileValidatorHandler = simpleBodyValidatorHandler(
  updateProfileValidator,
);
