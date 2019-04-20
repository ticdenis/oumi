import { Either } from 'fp-ts/lib/Either';
declare type EitherToPromise = <L, A>(result: Either<L, A>) => Promise<A>;
export declare const eitherToPromise: EitherToPromise;
export {};
//# sourceMappingURL=either-to-promise.d.ts.map