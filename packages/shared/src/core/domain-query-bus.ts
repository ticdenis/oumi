import { Query, QueryBus, QueryDomainError, QueryHandler } from './';

export class DomainQueryBus implements QueryBus {
  public static instance(): DomainQueryBus {
    if (null === DomainQueryBus._instance) {
      DomainQueryBus._instance = new this();
    }

    return DomainQueryBus._instance;
  }

  private static _instance: DomainQueryBus = null;
  private _queryHandlers: Map<string, QueryHandler<any, any>> = new Map();

  public addHandler(
    queryName: string,
    queryHandler: QueryHandler<any, any>,
  ): void {
    this._queryHandlers.set(queryName, queryHandler);
  }

  public async ask<T, R>(query: Query<T>): Promise<R> {
    if ('query' !== query.type) {
      return Promise.reject(
        new QueryDomainError(
          'INVALID_QUERY_TYPE',
          `Argument received not is a query is a <${query.type}>.`,
        ),
      );
    }

    if (!this._queryHandlers.has(query.name)) {
      return Promise.reject(
        new QueryDomainError(
          'QUERY_NOT_FOUND',
          `Query Handler for <${query.name}> not found.`,
        ),
      );
    }

    return this._queryHandlers.get(query.name)(query);
  }
}
