import {
  ContactQueryRepository,
  UserContactsData,
} from '@oumi-package/contact/lib';
import { ContactStub } from '@oumi-package/contact/lib/infrastructure/test/contact.stubs';
import {
  DomainQueryBus,
  Oumi,
  QueryBus,
  TestDomainError,
} from '@oumi-package/shared/lib/core';
import { UserIdStub } from '@oumi-package/shared/lib/infrastructure/test/user.stubs';
import { UserId } from '@oumi-package/user/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { loadContainer, SERVICE_ID } from '../../../src/config';
import {
  USER_CONTACTS_QUERY,
  USER_CONTACTS_QUERY_HANDLER,
  userContactsGetController,
} from '../../../src/features/user-contacts';

describe('user contacts GET controller', () => {
  let context: {
    app: () => express.Application;
    container: Oumi.Container;
    data: UserContactsData;
    request: () => supertest.Test;
  };

  beforeEach(done => {
    context = {
      app: () =>
        express()
          .use(express.json())
          .get('/test', userContactsGetController(context.container)),
      container: loadContainer(),
      data: {
        id: UserIdStub.value,
      },
      request: () =>
        supertest(context.app())
          .get('/test')
          .send(context.data),
    };
    context.container.set<UserId>(SERVICE_ID.USER_ID, UserIdStub);
    done();
  });

  test('user not found', async done => {
    // Given
    context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, {
      ask: () => Promise.reject(new TestDomainError('NOT_FOUND', 'error')),
    });
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.NOT_FOUND);
    expect(res.body.data).toBeNull();
    expect(res.body.errors).not.toBeNull();
    done();
  });

  test('user contacts', async done => {
    // Given
    const queryRepository = Substitute.for<ContactQueryRepository>();
    queryRepository
      .allOfId(Arg.any())
      .returns(fromEither(right([ContactStub])));
    const bus = DomainQueryBus.instance();
    context.container.set(SERVICE_ID.QUERY_REPOSITORY.CONTACT, queryRepository);
    bus.addHandler(
      USER_CONTACTS_QUERY,
      USER_CONTACTS_QUERY_HANDLER(context.container),
    );
    context.container.set<QueryBus>(SERVICE_ID.BUS.SYNC_QUERY, bus);
    // When
    const res = await context.request();
    // Then
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.data).not.toBeNull();
    expect(res.body.errors).toBeNull();
    done();
  });
});
