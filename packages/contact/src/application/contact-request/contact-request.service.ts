import {
  DomainError,
  EventPublisher,
  NullableStringVO,
} from '@oumi-package/core/lib';
import {
  UserId,
  UserNickname,
} from '@oumi-package/shared/lib/domain/user.props';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  ContactCommandRepository,
  ContactDomainError,
  ContactQueryRepository,
} from '../../domain';

export type ContactRequestService = (input: {
  requesterId: UserId;
  nickname: UserNickname;
  message: NullableStringVO;
}) => Promise<Either<DomainError, void>>;

export type ContactRequestBuilder = (options: {
  commandRepository: ContactCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: ContactQueryRepository;
}) => ContactRequestService;

export const contactRequestBuilderService: ContactRequestBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const requester = await queryRepository.ofId(input.requesterId).run();

  if (requester.isLeft()) {
    return left(ContactDomainError.notFound('id', input.requesterId.value));
  }

  const contact = await queryRepository.ofNickname(input.nickname).run();

  if (contact.isLeft()) {
    return left(ContactDomainError.notFound('nickname', input.nickname.value));
  }

  requester.value.newRequest(contact.value, input.message);

  await commandRepository.newRequest(requester.value, contact.value);

  await eventPublisher.publish(...requester.value.pullDomainEvents());

  return right(constVoid());
};
