import { userRegistrationValidator } from './../validator';
import { simpleBodyValidatorHandler } from './util';

export const userRegistrationValidatorHandler = simpleBodyValidatorHandler(
  userRegistrationValidator,
);
