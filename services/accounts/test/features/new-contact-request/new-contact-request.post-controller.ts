import { ContactRequestData } from '@oumi-package/contact/lib/application';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import {
  NEW_CONTACT_REQUEST_COMMAND,
  NEW_CONTACT_REQUEST_COMMAND_HANDLER,
  newContactRequestPostController,
} from '../../../src/features/new-contact-request';
import {
  CommandBus,
  ContactCommandRepository,
  ContactId,
  ContactIdStub,
  contactIdVO,
  contactNicknameVO,
  ContactQueryRepository,
  ContactStub,
  DomainCommandBus,
  EventPublisher,
  generateContactStub,
  loadContainer,
  Oumi,
  SERVICE_ID,
  TestDomainError,
  UserId,
  UserIdStub,
  UserNicknameStub,
} from '../../helpers/domain-imports';

describe('contact new request POST controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: ContactRequestData;
    id: ContactId;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    context = {
      app: () =>
        express()
          .use(express.json())
          .post('/test', newContactRequestPostController(context.container)),
      container: loadContainer(),
      data: {
        message: 'Hola',
        nickname: UserNicknameStub.value,
        requesterId: ContactIdStub.value,
      },
      id: UserIdStub,
      request: () =>
        supertest(context.app())
          .post('/test')
          .send(context.data),
    };
    done();
  });

  test('contact not found', async done => {
    // Given
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, {
      dispatch: () => Promise.reject(new TestDomainError('NOT_FOUND', 'error')),
    });
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.id);
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
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.id);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CONFLICT);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('contact request sended', async done => {
    // Given
    const queryRepository = Substitute.for<ContactQueryRepository>();
    queryRepository.ofId(Arg.any()).returns(fromEither(right(ContactStub)));
    queryRepository.ofNickname(Arg.any()).returns(
      fromEither(
        right(
          generateContactStub({
            id: contactIdVO(),
            nickname: contactNicknameVO('other'),
            requests: [],
          }),
        ),
      ),
    );
    const bus = DomainCommandBus.instance();
    context.container.set<ContactQueryRepository>(
      SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      queryRepository,
    );
    const commandRepository = Substitute.for<ContactCommandRepository>();
    commandRepository.newRequest(Arg.any()).returns(Promise.resolve());
    context.container.set<ContactCommandRepository>(
      SERVICE_ID.COMMAND_REPOSITORY.CONTACT,
      commandRepository,
    );
    context.container.set<UserId>(SERVICE_ID.USER_ID, context.id);
    context.container.set<EventPublisher>(
      SERVICE_ID.EVENT_PUBLISHER,
      Substitute.for<EventPublisher>(),
    );
    bus.addHandler(
      NEW_CONTACT_REQUEST_COMMAND,
      NEW_CONTACT_REQUEST_COMMAND_HANDLER(context.container),
    );
    context.container.set<CommandBus>(SERVICE_ID.BUS.SYNC_COMMAND, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
