import { Oumi } from '@oumi-package/shared/lib/core';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

import { simpleBodyValidatorHandler } from '../../util';

const type = t.type({
  contactId: t.string,
});

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const confirmContactRequestValidator: Oumi.Validator<
  returnType
> = data => type.decode(data);

export const confirmContactRequestValidatorHandler = simpleBodyValidatorHandler(
  confirmContactRequestValidator,
);
