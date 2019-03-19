import { EventPublisher } from '@oumi-package/core';

import { Either, left, right } from 'fp-ts/lib/Either';
import { constVoid } from 'fp-ts/lib/function';

import {
  User,
  UserCommandRepository,
  UserDomainError,
  UserEmail,
  UserFirstname,
  UserId,
  UserLastname,
  UserNickname,
  UserPassword,
  UserPhone,
  UserQueryRepository,
} from '../../../domain';

export interface UserRegistrationPayload {
  email: UserEmail;
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  nickname: UserNickname;
  password: UserPassword;
  phone: UserPhone;
}

export type UserRegistration = (
  input: UserRegistrationPayload,
) => Promise<Either<UserDomainError, void>>;

export interface UserRegistrationServiceConstructor {
  commandRepository: UserCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: UserQueryRepository;
}

export type UserRegistrationService = (
  args: UserRegistrationServiceConstructor,
) => UserRegistration;

export const userRegistration: UserRegistrationService = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const userExists = await queryRepository.ofEmail(input.email);

  if (null !== userExists) {
    return left(UserDomainError.alreadyExists(input.email.value));
  }

  const user = User.create(input);

  await commandRepository.create(user);

  await eventPublisher.publish(...user.pullDomainEvents());

  return right(constVoid());
};
