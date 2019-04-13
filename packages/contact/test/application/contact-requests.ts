import { UserId } from '@oumi-package/shared/lib/domain/user.props';
import { UserIdStub } from '@oumi-package/shared/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as R from 'ramda';

import {
  contactRequestsBuilderService,
  ContactRequestsData,
  contactRequestsHandler,
  ContactRequestsQuery,
  contactRequestsTransformer,
} from '../../src/application';
import { Contact, ContactQueryRepository } from '../../src/domain';
import { ContactStub } from '../../src/infrastructure/test/contact.stubs';

const test = ava as TestInterface<{
  contact: Contact;
  data: ContactRequestsData;
  repository: {
    query: ObjectSubstitute<ContactQueryRepository>;
  };
  userId: UserId;
}>;

test.beforeEach(t => {
  t.context.contact = ContactStub;
  t.context.data = {
    id: t.context.contact.id.value,
  };
  t.context.repository = {
    query: Substitute.for<ContactQueryRepository>(),
  };
  t.context.userId = UserIdStub;
});

test('should return a contact requests of contact', async t => {
  // Given
  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.contact)));
  const service = contactRequestsBuilderService({
    queryRepository: t.context.repository.query,
  });
  const queryHandler = contactRequestsHandler(service);
  const query = new ContactRequestsQuery(t.context.data);
  // When
  const response = await queryHandler(query);
  // Then
  t.true(
    R.includes(response, [
      contactRequestsTransformer([t.context.contact.requests[0]]),
    ]),
  );
});

test('should throw not found error', async t => {
  // Given
  t.context.repository.query.ofId(Arg.any()).returns(fromLeft(null));
  const service = contactRequestsBuilderService({
    queryRepository: t.context.repository.query,
  });
  const queryHandler = contactRequestsHandler(service);
  const query = new ContactRequestsQuery(t.context.data);
  // When
  const fn = queryHandler(query);
  // Then
  await t.throwsAsync(fn);
});
