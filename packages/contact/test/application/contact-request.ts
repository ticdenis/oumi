import { EventPublisher } from '@oumi-package/shared/lib/core';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  contactRequestBuilderService,
  ContactRequestCommand,
  ContactRequestData,
  contactRequestHandler,
} from '../../src/application';
import {
  Contact,
  ContactCommandRepository,
  contactIdVO,
  contactNicknameVO,
  ContactQueryRepository,
} from '../../src/domain';
import {
  ContactIdStub,
  ContactMessageStub,
  ContactNicknameStub,
  generateContactStub,
} from '../../src/infrastructure/test/contact.stubs';

const helper = {
  command: (data: ContactRequestData) => new ContactRequestCommand(data),
  handler: (
    opts: Partial<{
      commandRepository: ContactCommandRepository;
      eventPublisher: EventPublisher;
      queryRepository: ContactQueryRepository;
    }> = {},
  ) =>
    contactRequestHandler(
      contactRequestBuilderService({
        commandRepository:
          opts.commandRepository || Substitute.for<ContactCommandRepository>(),
        eventPublisher: opts.eventPublisher || Substitute.for<EventPublisher>(),
        queryRepository:
          opts.queryRepository || Substitute.for<ContactQueryRepository>(),
      }),
    ),
};

const test = ava as TestInterface<{
  contact: Contact;
  data: ContactRequestData;
}>;

test.beforeEach(t => {
  t.context.contact = generateContactStub({
    id: contactIdVO(),
    nickname: contactNicknameVO('contactA'),
    requests: [],
  });
  t.context.data = {
    message: ContactMessageStub.value,
    nickname: ContactNicknameStub.value,
    requesterId: ContactIdStub.value,
  };
});

test('should create new request', async t => {
  // Given
  const queryRepository = Substitute.for<ContactQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(t.context.contact)));
  queryRepository
    .ofNickname(Arg.any())
    .returns(fromEither(right(t.context.contact)));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.notThrowsAsync(fn);
});

test('should throw requester not found error', async t => {
  // Given
  const queryRepository = Substitute.for<ContactQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw contact not found error', async t => {
  // Given
  const queryRepository = Substitute.for<ContactQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(t.context.contact)));
  queryRepository.ofNickname(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});
