import { Either } from 'fp-ts/lib/Either';

export type EitherToPromise = <L, A>(result: Either<L, A>) => Promise<A>;

export const eitherToPromise: EitherToPromise = result =>
  result.isLeft()
    ? Promise.reject(result.value)
    : Promise.resolve(result.value);
