import {
  Command,
  CommandBus,
  Oumi,
  Query,
  QueryBus,
} from '@oumi-package/core/lib';

import { SERVICE_ID } from '../../config';

export type Resolver<A = any, T = any> = (
  parent: any,
  args: A,
  context: { container: Oumi.Container },
) => T | Promise<T>;

export const mutationResolver = <Data>(
  // tslint:disable-next-line: variable-name
  CommandClass: new (data: Data) => Command<Data>,
): Resolver<{ input: Data }, void> => (_, { input }, { container }) =>
  container
    .get<CommandBus>(SERVICE_ID.BUS.COMMAND)
    .dispatch(new CommandClass(input));

export const queryResolver = <Data, Response>(
  // tslint:disable-next-line: variable-name
  QueryClass: new (data: Data) => Query<Data>,
): Resolver<{ input: Data }, Response> => (_, { input }, { container }) =>
  container
    .get<QueryBus>(SERVICE_ID.BUS.QUERY)
    .ask<Data, Response>(new QueryClass(input));
