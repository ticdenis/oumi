import { EventPublisher } from '@oumi-package/core/lib';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';
import * as R from 'ramda';

import {
  UserCommandRepository,
  UserDomainError,
  UserFirstname,
  UserId,
  UserLastname,
  UserNickname,
  UserPhone,
  UserQueryRepository,
} from '../../domain';

export type UpdateProfileService = (input: {
  id: UserId;
  nickname: UserNickname;
  firstname: UserFirstname;
  lastname: UserLastname;
  phone: UserPhone;
}) => Promise<Either<UserDomainError, void>>;

export type UpdateProfileBuilder = (options: {
  commandRepository: UserCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: UserQueryRepository;
}) => UpdateProfileService;

export const updateProfileBuilderService: UpdateProfileBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const user = await queryRepository.ofId(input.id).run();

  if (user.isLeft()) {
    return left(UserDomainError.notFound(input.id.value));
  }

  user.value.updateProfile(R.omit(['id'], input));

  await commandRepository.updateProfile(user.value);

  await eventPublisher.publish(...user.value.pullDomainEvents());

  return right(constVoid());
};
