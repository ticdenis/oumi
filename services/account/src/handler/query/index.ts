import { Oumi, QueryHandler } from '@oumi-package/core';

export type MakeCommandHandler = (
  container: Oumi.Container,
) => [string, QueryHandler<any, any>];

export type QueryHandlers = (
  container: Oumi.Container,
) => [string, QueryHandler<any, any>][];

export const QUERY_HANDLERS: QueryHandlers = container => [];
