import { Oumi } from '@oumi-package/core/lib';

import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

const type = t.type({
  id: t.string,
});

type returnType = Either<t.Errors, t.TypeOf<typeof type>>;

export const profileValidator: Oumi.Validator<returnType> = data =>
  type.decode(data);
