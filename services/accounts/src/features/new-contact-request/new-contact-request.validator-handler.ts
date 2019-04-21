import { Oumi } from '@oumi-package/shared/lib/core';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

import { simpleBodyValidatorHandler } from '../../util';

const type = t.intersection([
  t.type({
    nickname: t.string,
  }),
  t.partial({
    message: t.string,
  }),
]);

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const newContactRequestValidator: Oumi.Validator<returnType> = data =>
  type.decode(data);

export const newContactRequestValidatorHandler = simpleBodyValidatorHandler(
  newContactRequestValidator,
);
