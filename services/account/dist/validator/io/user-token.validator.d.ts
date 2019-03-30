import { Oumi } from '@oumi-package/core/lib';
import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
declare const type: t.TypeC<{
    email: t.StringC;
    password: t.StringC;
}>;
declare type returnType = Either<t.Errors, t.TypeOf<typeof type>>;
export declare const userTokenValidator: Oumi.Validator<returnType>;
export {};
//# sourceMappingURL=user-token.validator.d.ts.map