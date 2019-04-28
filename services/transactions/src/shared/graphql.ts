import {
  Command,
  CommandBus,
  EventPublisher,
  EventSubscriber,
  Oumi,
  Query,
  QueryBus,
} from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../config';

const persistDomainEventsJob = (container: Oumi.Container) =>
  container
    .get<EventPublisher>(SERVICE_ID.DOMAIN_EVENT_REPOSITORY)
    .publish(
      ...container.get<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER).events(),
    );

const clearDomainEventsJob = (container: Oumi.Container) =>
  container.get<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER).clear();

export const runDomainEventsJob = async (container: Oumi.Container) =>
  Promise.all([
    persistDomainEventsJob(container),
    Promise.resolve(clearDomainEventsJob(container)),
  ]);

export type Resolver<A = any, T = any> = (
  parent: any,
  args: A,
  context: { container: Oumi.Container },
) => T | Promise<T>;

export function mutationResolver<Data>(
  CommandClass: new (data: Data) => Command<Data>,
): Resolver<{ input: Data }, void> {
  return (_, { input }, { container }) =>
    container
      .get<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND)
      .dispatch(new CommandClass(input))
      .then(async response => {
        await runDomainEventsJob(container);
        return response;
      });
}

export function queryResolver<Data, Response>(
  QueryClass: new (data: Data) => Query<Data>,
): Resolver<{ input: Data }, Response> {
  return (_, { input }, { container }) =>
    container
      .get<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY)
      .ask<Data, Response>(new QueryClass(input))
      .then(async response => {
        await runDomainEventsJob(container);
        return response;
      });
}
