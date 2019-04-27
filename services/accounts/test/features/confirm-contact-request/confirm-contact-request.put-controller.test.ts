import { ConfirmContactRequestData } from '@oumi-package/contact/lib/application';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { generateContactRequestStub } from '../../../../../packages/contact/src/infrastructure/test/contact.stubs';
import {
  CONFIRM_CONTACT_REQUEST_COMMAND,
  CONFIRM_CONTACT_REQUEST_COMMAND_HANDLER,
  confirmContactRequestPutController,
} from '../../../src/features/confirm-contact-request';
import {
  CommandBus,
  Contact,
  ContactCommandRepository,
  ContactId,
  contactIdVO,
  ContactQueryRepository,
  ContactRequestStatusPendingStub,
  DomainCommandBus,
  EventPublisher,
  generateContactStub,
  loadContainer,
  Oumi,
  SERVICE_ID,
  TestDomainError,
  UserId,
} from '../../helpers/domain-imports';

describe('contact new request POST controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: ConfirmContactRequestData;
    contact: Contact;
    requester: Contact;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    const contactId: ContactId = contactIdVO();
    const requesterId: ContactId = contactIdVO();

    context = {
      app: () =>
        express()
          .use(express.json())
          .put('/test', confirmContactRequestPutController(context.container)),
      contact: generateContactStub({
        id: contactId,
        requests: [
          generateContactRequestStub({
            id: requesterId,
            status: ContactRequestStatusPendingStub,
          }),
        ],
      }),
      container: loadContainer(),
      data: {
        contactId: contactId.value,
        contactRequestId: requesterId.value,
      },
      request: () =>
        supertest(context.app())
          .put('/test')
          .send(context.data),
      requester: generateContactStub({
        id: requesterId,
        requests: [
          generateContactRequestStub({
            id: contactId,
            status: ContactRequestStatusPendingStub,
          }),
        ],
      }),
    };
    done();
  });

  test('contact not found', async done => {
    // Given
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () => Promise.reject(new TestDomainError('NOT_FOUND', 'error')),
    });
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.requester.id);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.NOT_FOUND);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('repo error', async done => {
    // Given
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () => Promise.reject(new TestDomainError('UNKNOWN', 'error')),
    });
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.requester.id);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('contact request confirmed', async done => {
    // Given
    const queryRepository = Substitute.for<ContactQueryRepository>();
    queryRepository
      .ofId(Arg.is((id: ContactId) => context.contact.id.equalsTo(id)))
      .returns(fromEither(right(context.contact)));

    queryRepository
      .ofId(Arg.is((id: ContactId) => context.requester.id.equalsTo(id)))
      .returns(fromEither(right(context.requester)));

    context.container.set<UserId>(SERVICE_ID.USER_ID, context.requester.id);
    const bus = DomainCommandBus.instance();
    context.container.set<ContactQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      queryRepository,
    );
    const commandRepository = Substitute.for<ContactCommandRepository>();
    commandRepository.confirmRequest(Arg.any()).returns(Promise.resolve());
    context.container.set<ContactCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.CONTACT,
      commandRepository,
    );

    context.container.set<EventPublisher>(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    bus.addHandler(
      CONFIRM_CONTACT_REQUEST_COMMAND,
      CONFIRM_CONTACT_REQUEST_COMMAND_HANDLER(context.container),
    );
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
