import * as R from 'ramda';

import { request, Request, stringVO } from '.';

// Types

export interface Query<T> extends Request {
  readonly data: T;
  readonly name: string;
  readonly occurredOn: Date;
}

export type QueryHandler<T extends Query<any>, Q> = (query: T) => Promise<Q>;

export interface QueryBus {
  ask<T, Q>(query: Query<T>): Promise<Q>;
}

// Helpers

export const query = <T>(data: T, name: string): Query<T> =>
  R.merge(request(), {
    data,
    name,
    occurredOn: new Date(),
    type: stringVO('query').value,
  });

// tslint:disable-next-line:no-shadowed-variable
export const asker = (queryBus: QueryBus) => async <T, Q>(query: Query<T>) => {
  await queryBus.ask<T, Q>(query);
};
