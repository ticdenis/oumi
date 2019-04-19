import { Oumi, QueryHandler } from '@oumi-package/shared/lib/core';

export type MakeQueryHandler = (
  container: Oumi.Container,
) => [string, QueryHandler<any, any>];

export type QueryHandlers = (
  container: Oumi.Container,
) => [string, QueryHandler<any, any>][];

export const QUERY_HANDLERS: QueryHandlers = container => [
  // ?(container),
];
