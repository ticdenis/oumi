import { changePasswordValidator } from '../validator';

import { simpleBodyValidatorHandler } from './util';

export const changePasswordValidatorHandler = simpleBodyValidatorHandler(
  changePasswordValidator,
);
