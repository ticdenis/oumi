import { UserId } from '@oumi-package/shared/lib/domain/user.props';

import { Either } from 'fp-ts/lib/Either';

import { ContactDomainError, ContactQueryRepository } from '../../domain';

import { UserContactsResponse } from '.';
import { userContactsTransformer } from './user-contacts.response';

export type UserContactsService = (input: {
  id: UserId;
}) => Promise<Either<ContactDomainError, UserContactsResponse>>;

export type UserContactsBuilder = (options: {
  queryRepository: ContactQueryRepository;
}) => UserContactsService;

export const userContactsBuilderService: UserContactsBuilder = ({
  queryRepository,
}) => input =>
  queryRepository
    .allOfId(input.id)
    .mapLeft(() => ContactDomainError.notFound('id', input.id.value))
    .map(userContactsTransformer)
    .run();
