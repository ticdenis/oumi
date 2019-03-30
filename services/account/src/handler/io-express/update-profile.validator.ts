import { updateProfileValidator } from '../../validator/io';

import { simpleBodyValidatorHandler } from './util';

export const updateProfileValidatorHandler = simpleBodyValidatorHandler(
  updateProfileValidator,
);
