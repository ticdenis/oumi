import { Oumi } from '@oumi-package/shared/lib/core';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

const type = t.type({
  email: t.string,
  firstname: t.string,
  id: t.string,
  lastname: t.string,
  nickname: t.string,
  password: t.string,
  phone: t.string,
});

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const userRegistrationValidator: Oumi.Validator<returnType> = data =>
  type.decode(data);
