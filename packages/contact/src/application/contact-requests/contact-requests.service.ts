import { Either } from 'fp-ts/lib/Either';

import {
  ContactDomainError,
  ContactId,
  ContactQueryRepository,
} from '../../domain';

import { ContactRequestsResponse, contactRequestsTransformer } from '.';

export type ContactRequestsService = (input: {
  id: ContactId;
}) => Promise<Either<ContactDomainError, ContactRequestsResponse>>;

export type ContactRequestsBuilder = (options: {
  queryRepository: ContactQueryRepository;
}) => ContactRequestsService;

export const contactRequestsBuilderService: ContactRequestsBuilder = ({
  queryRepository,
}) => async input =>
  queryRepository
    .ofId(input.id)
    .mapLeft(() => ContactDomainError.notFound('id', input.id.value))
    .map(contact => contactRequestsTransformer(contact.requests))
    .run();
