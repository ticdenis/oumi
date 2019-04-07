import {
  event,
  EventPublisher,
  EventSubscriber,
  Oumi,
} from '@oumi-package/core/lib';

import { Substitute } from '@fluffy-spoon/substitute';
import express from 'express';

import { loadContainer, SERVICE_ID } from '../../src/config';
import { persistDomainEventsHandler } from '../../src/middleware';

describe('persist domain events handler', () => {
  let context: {
    container: Oumi.Container;
    next: express.NextFunction;
    req: express.Request;
    res: express.Response;
  };

  beforeEach(done => {
    context = {
      container: loadContainer(),
      next: jest.fn(),
      req: Substitute.for<express.Request>(),
      res: Substitute.for<express.Response>(),
    };
    done();
  });

  test('call domain event repository publish method with events from global subscriber', async done => {
    // Given
    const fakeDomainEventRepository = Substitute.for<EventPublisher>();
    fakeDomainEventRepository.publish().returns(Promise.resolve(undefined));
    context.container.set<EventPublisher>(
      SERVICE_ID.DOMAIN_EVENT_REPOSITORY,
      fakeDomainEventRepository,
    );
    const fakeEventSubscriber = Substitute.for<EventSubscriber>();
    fakeEventSubscriber.events().returns([event({})]);
    context.container.set<EventSubscriber>(
      SERVICE_ID.EVENT_SUBSCRIBER,
      fakeEventSubscriber,
    );
    // When
    await persistDomainEventsHandler(context.container)(
      context.req,
      context.res,
      context.next,
    );
    // Then
    expect(context.next).toHaveBeenCalled();
    done();
  });
});
