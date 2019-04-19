import { Oumi } from '@oumi-package/shared/lib/core';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

const type = t.type({
  email: t.string,
  password: t.string,
});

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const userTokenValidator: Oumi.Validator<returnType> = data =>
  type.decode(data);
