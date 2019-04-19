import { Message, stringVO, uuidVO } from './';

// Types

export type QueryHandler<T extends Query<any>, Q> = (query: T) => Promise<Q>;

export interface QueryBus {
  ask<T, Q>(query: Query<T>): Promise<Q>;
}

// Helpers

export abstract class Query<T> implements Message {
  public readonly data: T;
  public readonly id: string;
  public readonly name: string;
  public readonly occurredOn: Date;
  public readonly type: string;

  public constructor(data: T) {
    this.data = data;
    this.id = uuidVO().value;
    this.name = this.constructor.name;
    this.occurredOn = new Date();
    this.type = stringVO('query').value;
  }
}

export const asker = (queryBus: QueryBus) => async <T, Q>(query: Query<T>) => {
  await queryBus.ask<T, Q>(query);
};
