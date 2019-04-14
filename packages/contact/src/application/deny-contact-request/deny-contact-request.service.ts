import { DomainError, EventPublisher } from '@oumi-package/core/lib';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  ContactCommandRepository,
  ContactDomainError,
  ContactId,
  ContactQueryRepository,
} from '../../domain';

export type DenyContactRequestService = (input: {
  contactRequestId: ContactId;
  contactId: ContactId;
}) => Promise<Either<DomainError, void>>;

export type DenyContactRequestBuilder = (options: {
  commandRepository: ContactCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: ContactQueryRepository;
}) => DenyContactRequestService;

export const denyContactRequestBuilderService: DenyContactRequestBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const contact = await queryRepository.ofId(input.contactId).run();

  if (contact.isLeft()) {
    return left(ContactDomainError.notFound('id', input.contactId.value));
  }

  const requester = await queryRepository.ofId(input.contactRequestId).run();

  if (requester.isLeft()) {
    return left(
      ContactDomainError.notFound('id', input.contactRequestId.value),
    );
  }

  try {
    contact.value.denyRequest(requester.value);
  } catch (err) {
    return left(err);
  }

  await commandRepository.denyRequest(contact.value, requester.value);

  await eventPublisher.publish(...contact.value.pullDomainEvents());

  return right(constVoid());
};
