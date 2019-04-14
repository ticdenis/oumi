import { EventPublisher } from '@oumi-package/core/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { ExecutionContext, TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  confirmContactRequestBuilderService,
  ConfirmContactRequestCommand,
  ConfirmContactRequestData,
  confirmContactRequestHandler,
} from '../../src/application';
import {
  Contact,
  ContactCommandRepository,
  contactIdVO,
  ContactQueryRepository,
} from '../../src/domain';
import { ContactId } from '../../src/domain/contact.props';
import {
  ContactRequestStatusConfirmedStub,
  ContactRequestStatusPendingStub,
  generateContactRequestStub,
  generateContactStub,
} from '../../src/infrastructure/test/contact.stubs';

interface Context {
  contact: Contact;
  requester: Contact;
  data: ConfirmContactRequestData;
  event: {
    publisher: ObjectSubstitute<EventPublisher>;
  };
  repository: {
    query: ObjectSubstitute<ContactQueryRepository>;
    command: ObjectSubstitute<ContactCommandRepository>;
  };
}

const test = ava as TestInterface<Context>;

test.beforeEach(t => {
  const contactId: ContactId = contactIdVO();
  const requesterId: ContactId = contactIdVO();
  t.context.contact = generateContactStub({
    id: contactId,
    requests: [
      generateContactRequestStub({
        id: contactId,
        status: ContactRequestStatusPendingStub,
      }),
    ],
  });
  t.context.requester = generateContactStub({
    id: requesterId,
    requests: [
      generateContactRequestStub({
        id: requesterId,
        status: ContactRequestStatusPendingStub,
      }),
    ],
  });
  t.context.data = {
    contactId: t.context.contact.id.value,
    contactRequestId: t.context.requester.id.value,
  };
  t.context.event = {
    publisher: Substitute.for<EventPublisher>(),
  };
  t.context.repository = {
    command: Substitute.for<ContactCommandRepository>(),
    query: Substitute.for<ContactQueryRepository>(),
  };
});

test('should confirm request', async t => {
  // Given
  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.contact)));

  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.requester)));

  const service = confirmContactRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.event.publisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = confirmContactRequestHandler(service);
  const command = new ConfirmContactRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.notThrowsAsync(fn);
});

const testShouldThrowNotFoundRequestError = (
  contact: Contact,
  requester: Contact,
  contactReturns: boolean,
  requesterReturns: boolean,
) => async (t: ExecutionContext<Context>) => {
  // Given
  t.context.repository.query
    .ofId(Arg.is((id: ContactId) => contact.id.equalsTo(id)))
    .returns(contactReturns ? fromEither(right(contact)) : fromLeft(null));

  t.context.repository.query
    .ofId(Arg.is((id: ContactId) => requester.id.equalsTo(id)))
    .returns(requesterReturns ? fromEither(right(requester)) : fromLeft(null));

  const service = confirmContactRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.event.publisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = confirmContactRequestHandler(service);
  const command = new ConfirmContactRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
};

test('should throw contact not found in request error', async t => {
  await testShouldThrowNotFoundRequestError(
    t.context.contact,
    t.context.requester,
    false,
    true,
  )(t);
});

test('should throw requester not found in request error', async t => {
  await testShouldThrowNotFoundRequestError(
    t.context.contact,
    t.context.requester,
    true,
    false,
  )(t);
});

test('should throw contact request not found error', async t => {
  const contact = generateContactStub({
    id: t.context.contact.id,
    requests: [],
  });

  await testShouldThrowNotFoundRequestError(
    contact,
    t.context.requester,
    true,
    true,
  )(t);
});

test('should throw requester request not found error', async t => {
  const requester = generateContactStub({
    id: t.context.requester.id,
    requests: [],
  });
  await testShouldThrowNotFoundRequestError(
    t.context.contact,
    requester,
    true,
    true,
  )(t);
});

test('should throw contact request already confirmed status error', async t => {
  const contact = generateContactStub({
    id: t.context.contact.id,
    requests: [
      generateContactRequestStub({
        id: t.context.contact.id,
        status: ContactRequestStatusConfirmedStub,
      }),
    ],
  });
  await testShouldThrowNotFoundRequestError(
    contact,
    t.context.requester,
    true,
    true,
  )(t);
});

test('should throw requester request already confirmed status error', async t => {
  const requester = generateContactStub({
    id: t.context.requester.id,
    requests: [
      generateContactRequestStub({
        id: t.context.requester.id,
        status: ContactRequestStatusConfirmedStub,
      }),
    ],
  });
  await testShouldThrowNotFoundRequestError(
    t.context.contact,
    requester,
    true,
    true,
  )(t);
});
