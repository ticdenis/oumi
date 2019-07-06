import { Oumi } from '@oumi-package/shared/lib/core';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

import { simpleBodyValidatorHandler } from '../../shared';

const type = t.type({
  id: t.string,
});

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const endDebtValidator: Oumi.Validator<returnType> = data =>
  type.decode(data);

export const endDebtValidatorHandler = simpleBodyValidatorHandler(
  endDebtValidator,
);
