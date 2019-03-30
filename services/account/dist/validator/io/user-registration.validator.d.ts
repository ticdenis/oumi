import { Oumi } from '@oumi-package/core/lib';
import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
declare const type: t.TypeC<{
  email: t.StringC;
  firstname: t.StringC;
  id: t.StringC;
  lastname: t.StringC;
  nickname: t.StringC;
  password: t.StringC;
  phone: t.StringC;
}>;
declare type returnType = Either<t.Errors, t.TypeOf<typeof type>>;
export declare const userRegistrationValidator: Oumi.Validator<returnType>;
export {};
//# sourceMappingURL=user-registration.validator.d.ts.map
