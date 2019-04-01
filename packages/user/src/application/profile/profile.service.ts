import { Either } from 'fp-ts/lib/Either';

import { UserDomainError, UserId, UserQueryRepository } from '../../domain';

import { profileDataTransformer, ProfileResponse } from '.';

export type ProfileService = (input: {
  id: UserId;
}) => Promise<Either<UserDomainError, ProfileResponse>>;

export type ProfileBuilder = (options: {
  queryRepository: UserQueryRepository;
}) => ProfileService;

export const profileBuilderService: ProfileBuilder = ({
  queryRepository,
}) => input =>
  queryRepository
    .ofId(input.id)
    .mapLeft(() => UserDomainError.notFound(input.id.value))
    .map(profileDataTransformer)
    .run();
