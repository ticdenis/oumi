import { Oumi, QueryHandler } from '@oumi-package/core';

import userTokenHandler from './user-token.handler';

export type MakeQueryHandler = (
  container: Oumi.Container,
) => [string, QueryHandler<any, any>];

export type QueryHandlers = (
  container: Oumi.Container,
) => [string, QueryHandler<any, any>][];

export const QUERY_HANDLERS: QueryHandlers = container => [
  userTokenHandler(container),
];
