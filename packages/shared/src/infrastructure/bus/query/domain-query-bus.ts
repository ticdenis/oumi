import { domainError, Query, QueryBus, QueryHandler } from '../../../domain';

export class DomainQueryBus implements QueryBus {
  public static instance(): DomainQueryBus {
    if (DomainQueryBus._instance === null) {
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
        domainError(
          'dispatch_invalid_query',
          `Argument received not is a query is a <${query.type}>.`,
        ),
      );
    }

    if (!this._queryHandlers.has(query.name)) {
      return Promise.reject(
        domainError(
          'query_not_found',
          `Query Handler for <${query.name}> not found.`,
        ),
      );
    }

    const response = await this._queryHandlers.get(query.name)(query);

    return response;
  }
}
