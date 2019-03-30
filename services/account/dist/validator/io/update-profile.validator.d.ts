import { Oumi } from '@oumi-package/core/lib';
import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
declare const type: t.TypeC<{
    firstname: t.StringC;
    lastname: t.StringC;
    nickname: t.StringC;
    phone: t.StringC;
}>;
declare type returnType = Either<t.Errors, t.TypeOf<typeof type>>;
export declare const updateProfileValidator: Oumi.Validator<returnType>;
export {};
//# sourceMappingURL=update-profile.validator.d.ts.map