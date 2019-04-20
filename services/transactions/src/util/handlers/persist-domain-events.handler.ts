import {
  EventPublisher,
  EventSubscriber,
  Oumi,
} from '@oumi-package/shared/lib/core';

import express from 'express';

import { SERVICE_ID } from '../../config';

export const persistDomainEventsHandler: Oumi.Handler<
  express.RequestHandler
> = container => async (req, res, next) => {
  await container
    .get<EventPublisher>(SERVICE_ID.DOMAIN_EVENT_REPOSITORY)
    .publish(
      ...container.get<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER).events(),
    );

  container.get<EventSubscriber>(SERVICE_ID.EVENT_SUBSCRIBER).clear();

  next();
};
