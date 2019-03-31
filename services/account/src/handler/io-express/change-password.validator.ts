import { changePasswordValidator } from '../../validator/io';

import { simpleBodyValidatorHandler } from './util';

export const changePasswordValidatorHandler = simpleBodyValidatorHandler(
  changePasswordValidator
);
