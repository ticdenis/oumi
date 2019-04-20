import { Oumi } from '@oumi-package/shared/lib/core';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { date } from 'io-ts-types/lib/Date/date';

import { simpleBodyValidatorHandler } from '../../util';

const type = t.intersection([
  t.type({
    amount: t.number,
    concept: t.string,
    currency: t.string,
    debtorId: t.string,
    id: t.string,
    loanerId: t.string,
  }),
  t.partial({
    initialDate: date,
    limitDate: date,
  }),
]);

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const newDebtRequestValidator: Oumi.Validator<returnType> = data =>
  type.decode(data);

export const newDebtRequestValidatorHandler = simpleBodyValidatorHandler(
  newDebtRequestValidator,
);
