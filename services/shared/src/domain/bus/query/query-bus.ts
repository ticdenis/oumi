import { Query } from './query';

export interface QueryBus {
  ask<T>(query: Query): T;
}

export const asker = (queryBus: QueryBus) => <T>(query: Query) =>
  queryBus.ask<T>(query);
