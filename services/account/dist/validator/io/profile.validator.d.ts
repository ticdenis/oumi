import { Oumi } from '@oumi-package/core/lib';
import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
declare const type: t.TypeC<{
  id: t.StringC;
}>;
declare type returnType = Either<t.Errors, t.TypeOf<typeof type>>;
export declare const profileValidator: Oumi.Validator<returnType>;
export {};
//# sourceMappingURL=profile.validator.d.ts.map
