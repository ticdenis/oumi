import { Oumi } from '@oumi-package/core/lib';
import express from 'express';
import { Either } from 'fp-ts/lib/Either';
import { Errors } from 'io-ts';
export declare type ValidatorHandler = <T>(
  validator: Oumi.Validator<Either<Errors, T>>,
) => Oumi.Handler<express.Handler>;
export declare const simpleBodyValidatorHandler: ValidatorHandler;
export declare const simpleParamsValidatorHandler: ValidatorHandler;
//# sourceMappingURL=util.d.ts.map
