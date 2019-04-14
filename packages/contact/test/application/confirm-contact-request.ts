import { EventPublisher } from '@oumi-package/core/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
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

const helper = {
  command: (data: ConfirmContactRequestData) =>
    new ConfirmContactRequestCommand(data),
  handler: (
    opts: Partial<{
      commandRepository: ContactCommandRepository;
      eventPublisher: EventPublisher;
      queryRepository: ContactQueryRepository;
    }> = {},
  ) =>
    confirmContactRequestHandler(
      confirmContactRequestBuilderService({
        commandRepository:
          opts.commandRepository || Substitute.for<ContactCommandRepository>(),
        eventPublisher: opts.eventPublisher || Substitute.for<EventPublisher>(),
        queryRepository:
          opts.queryRepository || Substitute.for<ContactQueryRepository>(),
      }),
    ),
};

interface Context {
  contact: Contact;
  requester: Contact;
  data: ConfirmContactRequestData;
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
});

test('should confirm request', async t => {
  // Given
  const queryRepository = Substitute.for<ContactQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(t.context.contact)));
  queryRepository
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.requester)));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.notThrowsAsync(fn);
});

const testShouldThrowNotFoundRequestError = (
  t: ExecutionContext<Context>,
) => async (
  contact: Contact,
  requester: Contact,
  contactReturns: boolean,
  requesterReturns: boolean,
) => {
  // Given
  const queryRepository = Substitute.for<ContactQueryRepository>();
  queryRepository
    .ofId(Arg.is((id: ContactId) => contact.id.equalsTo(id)))
    .returns(contactReturns ? fromEither(right(contact)) : fromLeft(null));
  queryRepository
    .ofId(Arg.is((id: ContactId) => requester.id.equalsTo(id)))
    .returns(requesterReturns ? fromEither(right(requester)) : fromLeft(null));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
};

test('should throw contact not found in request error', async t => {
  await testShouldThrowNotFoundRequestError(t)(
    t.context.contact,
    t.context.requester,
    false,
    true,
  );
});

test('should throw requester not found in request error', async t => {
  await testShouldThrowNotFoundRequestError(t)(
    t.context.contact,
    t.context.requester,
    true,
    false,
  );
});

test('should throw contact request not found error', async t => {
  const contact = generateContactStub({
    id: t.context.contact.id,
    requests: [],
  });
  await testShouldThrowNotFoundRequestError(t)(
    contact,
    t.context.requester,
    true,
    true,
  );
});

test('should throw requester request not found error', async t => {
  const requester = generateContactStub({
    id: t.context.requester.id,
    requests: [],
  });
  await testShouldThrowNotFoundRequestError(t)(
    t.context.contact,
    requester,
    true,
    true,
  );
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
  await testShouldThrowNotFoundRequestError(t)(
    contact,
    t.context.requester,
    true,
    true,
  );
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
  await testShouldThrowNotFoundRequestError(t)(
    t.context.contact,
    requester,
    true,
    true,
  );
});
