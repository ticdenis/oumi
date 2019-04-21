import { Either } from 'fp-ts/lib/Either';
export declare type EitherToPromise = <L, A>(result: Either<L, A>) => Promise<A>;
export declare const eitherToPromise: EitherToPromise;
//# sourceMappingURL=either-to-promise.d.ts.map