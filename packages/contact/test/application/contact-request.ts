import { EventPublisher } from '@oumi-package/core/lib';
import {
  userIdVO,
  userNicknameVO,
} from '@oumi-package/shared/lib/domain/user.props';
import {
  UserIdStub,
  UserNicknameStub,
} from '@oumi-package/shared/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
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
  ContactQueryRepository,
} from '../../src/domain';
import {
  ContactMessageStub,
  generateContactStub,
} from '../../src/infrastructure/test/contact.stubs';

const test = ava as TestInterface<{
  contact: Contact;
  data: ContactRequestData;
  event: {
    publisher: ObjectSubstitute<EventPublisher>;
  };
  repository: {
    query: ObjectSubstitute<ContactQueryRepository>;
    command: ObjectSubstitute<ContactCommandRepository>;
  };
}>;

test.beforeEach(t => {
  t.context.contact = generateContactStub({
    id: userIdVO(),
    nickname: userNicknameVO('contactA'),
    requests: [],
  });
  t.context.data = {
    message: ContactMessageStub.value,
    nickname: UserNicknameStub.value,
    requesterId: UserIdStub.value,
  };
  t.context.event = {
    publisher: Substitute.for<EventPublisher>(),
  };
  t.context.repository = {
    command: Substitute.for<ContactCommandRepository>(),
    query: Substitute.for<ContactQueryRepository>(),
  };
});

test('should create new request', async t => {
  // Given
  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.contact)));
  t.context.repository.query
    .ofNickname(Arg.any())
    .returns(fromEither(right(t.context.contact)));
  const service = contactRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.event.publisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = contactRequestHandler(service);
  const command = new ContactRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.notThrowsAsync(fn);
});

test('should throw requester not found error', async t => {
  // Given
  t.context.repository.query.ofId(Arg.any()).returns(fromLeft(null));
  const service = contactRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.event.publisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = contactRequestHandler(service);
  const command = new ContactRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw contact not found error', async t => {
  // Given
  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.contact)));
  t.context.repository.query.ofNickname(Arg.any()).returns(fromLeft(null));
  const service = contactRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.event.publisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = contactRequestHandler(service);
  const command = new ContactRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});
