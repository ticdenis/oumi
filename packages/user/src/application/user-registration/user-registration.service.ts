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
} from '../../domain';

export type UserRegistrationService = (input: {
  email: UserEmail;
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  nickname: UserNickname;
  password: UserPassword;
  phone: UserPhone;
}) => Promise<Either<UserDomainError, void>>;

export type UserRegistrationBuilder = (options: {
  commandRepository: UserCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: UserQueryRepository;
}) => UserRegistrationService;

export const userRegistrationBuilderService: UserRegistrationBuilder = ({
  commandRepository,
  eventPublisher,
  queryRepository,
}) => async input => {
  const userExists = (await queryRepository.ofEmail(input.email).run()).swap();

  if (userExists.isLeft()) {
    return left(UserDomainError.alreadyExists(input.email.value));
  }

  const user = User.create(input);

  await commandRepository.create(user);

  await eventPublisher.publish(...user.pullDomainEvents());

  return right(constVoid());
};
