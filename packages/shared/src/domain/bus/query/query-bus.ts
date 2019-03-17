import { Query } from './query';

export interface QueryBus {
  ask<T, R>(query: Query<T>): Promise<R>;
}

export const asker = (queryBus: QueryBus) => async <T, R>(query: Query<T>) => {
  await queryBus.ask<T, R>(query);
};
