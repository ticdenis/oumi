/// <reference types="express" />
import { Oumi } from '@oumi-package/shared/lib/core';
import { Either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
declare const type: t.IntersectionC<[t.TypeC<{
    amount: t.NumberC;
    concept: t.StringC;
    currency: t.StringC;
    debtorId: t.StringC;
    id: t.StringC;
    loanerId: t.StringC;
}>, t.PartialC<{
    initialDate: import("io-ts-types/lib/Date/date").DateC;
    limitDate: import("io-ts-types/lib/Date/date").DateC;
}>]>;
declare type returnType = Either<t.Errors, t.TypeOf<typeof type>>;
export declare const newDebtRequestValidator: Oumi.Validator<returnType>;
export declare const newDebtRequestValidatorHandler: Oumi.Handler<import("express").Handler>;
export {};
//# sourceMappingURL=new-debt-request.validator-handler.d.ts.map