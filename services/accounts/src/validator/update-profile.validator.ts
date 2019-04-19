import { Oumi } from '@oumi-package/shared/lib/core';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

const type = t.type({
  firstname: t.string,
  lastname: t.string,
  nickname: t.string,
  phone: t.string,
});

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const updateProfileValidator: Oumi.Validator<returnType> = data =>
  type.decode(data);
