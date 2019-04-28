import {
  event,
  EventPublisher,
  EventSubscriber,
  Oumi,
} from '@oumi-package/shared/lib/core';

import { Substitute } from '@fluffy-spoon/substitute';
import express from 'express';

import { loadContainer, SERVICE_ID } from '../../src/config';
import { persistDomainEventsHandler } from '../../src/shared';

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
    const fakeDomainEventRepository: EventPublisher = {
      publish: jest.fn(),
    };
    context.container.set<EventPublisher>(
      SERVICE_ID.DOMAIN_EVENT_REPOSITORY,
      fakeDomainEventRepository,
    );
    const fakeEvents = [event({})];
    const fakeEventSubscriber: EventSubscriber = {
      clear: jest.fn(),
      events: jest.fn().mockReturnValue(fakeEvents),
      handle: jest.fn(),
      isSubscribedTo: jest.fn(),
    };
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
    expect(fakeDomainEventRepository.publish).toHaveBeenCalledWith(
      ...fakeEvents,
    );
    expect(fakeEventSubscriber.events).toHaveBeenCalled();
    expect(fakeEventSubscriber.clear).toHaveBeenCalled();
    expect(context.next).toHaveBeenCalled();
    done();
  });
});
