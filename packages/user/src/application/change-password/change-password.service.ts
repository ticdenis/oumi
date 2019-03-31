import { EventPublisher, StringVO } from '@oumi-package/core';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';
import * as R from 'ramda';

import {
  UserCommandRepository,
  UserDomainError,
  UserId,
  UserPassword,
  UserQueryRepository,
} from '../../domain';

export type ChangePasswordService = (input: {
  id: UserId;
  newPassword: UserPassword
  oldPassword: StringVO,
}) => Promise<Either<UserDomainError, void>>;

export type ChangePasswordBuilder = (options: {
  commandRepository: UserCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: UserQueryRepository;
}) => ChangePasswordService;

export const changePasswordBuilderService: ChangePasswordBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const user = await queryRepository.ofId(input.id).run();

  if (user.isLeft()) {
    return left(UserDomainError.notFound(input.id.value));
  }

  user.value.changePassword(R.omit(['id'], input));

  await commandRepository.updatePassword(user.value);

  await eventPublisher.publish(...user.value.pullDomainEvents());

  return right(constVoid());
};
