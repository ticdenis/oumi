// tslint:disable-next-line: no-implicit-dependencies
import { Either } from 'fp-ts/lib/Either';

type EitherToPromise = <L, A>(result: Either<L, A>) => Promise<A>;

export const eitherToPromise: EitherToPromise = result =>
  result.isLeft()
    ? Promise.reject(result.value)
    : Promise.resolve(result.value);
