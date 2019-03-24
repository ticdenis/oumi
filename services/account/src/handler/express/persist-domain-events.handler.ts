import { EventSubscriber, Oumi } from '@oumi-package/core/lib';

import express from 'express';
import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { DomainEventEntity } from '../../entity/typeorm';

export const persistDomainEventsHandler: Oumi.Handler<
  express.RequestHandler
> = container => async (req, res, next) => {
  const events = container
    .get<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER)
    .events();

  const entityManager = container
    .get<Oumi.Database>(SERVICE_ID.DB.READ)
    .connection<Connection>()
    .createEntityManager();

  await Promise.all(
    events.map(event =>
      entityManager.insert(DomainEventEntity, {
        data: JSON.stringify(event.data),
        id: event.id,
        occurredOn: event.occurredOn,
        type: event.type,
      }),
    ),
  );

  next();
};
