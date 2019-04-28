import { Oumi } from '@oumi-package/shared/lib/core';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { date } from 'io-ts-types/lib/Date/date';

import { simpleBodyValidatorHandler } from '../../shared';

const type = t.intersection([
  t.type({
    debtId: t.string,
    id: t.string,
    quantity: t.number,
  }),
  t.partial({
    message: t.string,
  }),
]);

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const newPayValidator: Oumi.Validator<returnType> = data =>
  type.decode(data);

export const newPayValidatorHandler = simpleBodyValidatorHandler(
  newPayValidator,
);
