import { EventPublisher, EventSubscriber, Oumi } from '@oumi-package/core/lib';

import express from 'express';

import { SERVICE_ID } from '../config';

export const persistDomainEventsHandler: Oumi.Handler<
  express.RequestHandler
> = container => (req, res, next) => {
  container
    .get<EventPublisher>(SERVICE_ID.DOMAIN_EVENT_REPOSITORY)
    .publish(
      ...container.get<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER).events(),
    );

  next();
};