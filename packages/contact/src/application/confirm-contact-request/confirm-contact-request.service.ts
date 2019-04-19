import { EventPublisher } from '@oumi-package/shared/lib/core';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  ContactCommandRepository,
  ContactDomainError,
  ContactId,
  ContactQueryRepository,
} from '../..';

export type ConfirmContactRequestService = (input: {
  contactRequestId: ContactId;
  contactId: ContactId;
}) => Promise<Either<ContactDomainError, void>>;

export type ConfirmContactRequestBuilder = (options: {
  commandRepository: ContactCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: ContactQueryRepository;
}) => ConfirmContactRequestService;

export const confirmContactRequestBuilderService: ConfirmContactRequestBuilder = ({
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
    contact.value.confirmRequest(requester.value);
  } catch (err) {
    return left(err);
  }

  await commandRepository.confirmRequest(contact.value, requester.value);

  await eventPublisher.publish(...contact.value.pullDomainEvents());

  return right(constVoid());
};
