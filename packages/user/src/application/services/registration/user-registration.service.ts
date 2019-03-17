import { Either, left, right } from 'fp-ts/lib/Either';

import {
  User,
  userAlreadyExistsError,
  UserCommandRepository,
  UserEmail,
  UserFirstname,
  UserId,
  UserLastname,
  UserPassword,
  UserPhone,
  UserQueryRepository,
} from '../../../domain';

export interface UserRegistrationPayload {
  email: UserEmail;
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  password: UserPassword;
  phone: UserPhone;
}

export type UserRegistration = (
  input: UserRegistrationPayload,
) => Promise<Either<Error, void>>;

export type UserRegistrationService = (
  queryRepository: UserQueryRepository,
  commandRepository: UserCommandRepository,
) => UserRegistration;

export const userRegistration: UserRegistrationService = (
  queryRepository,
  commandRepository,
) => async input => {
  const userExists = await queryRepository.ofEmail(input.email);

  if (null !== userExists) {
    return left(userAlreadyExistsError(input.email.value));
  }

  const user = User.create(input);

  await commandRepository.create(user);

  return right(undefined);
};
