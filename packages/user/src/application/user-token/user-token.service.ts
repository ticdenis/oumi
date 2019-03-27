import { StringVO } from '@oumi-package/core';

import { Either, left } from 'fp-ts/lib/Either';

import {
  Token,
  TokenDomainError,
  TokenFactory,
  UserDomainError,
  UserEmail,
  UserQueryRepository,
} from '../../domain';

export type UserTokenService = (input: {
  email: UserEmail;
  password: StringVO;
}) => Promise<Either<UserDomainError | TokenDomainError, Token>>;

export type UserTokenBuilder = (options: {
  queryRepository: UserQueryRepository;
  tokenFactory: TokenFactory;
}) => UserTokenService;

export const userToken: UserTokenBuilder = ({
  queryRepository,
  tokenFactory,
}) => async input => {
  const user = await queryRepository.ofEmail(input.email);

  if (null === user || !user.password.equalsTo(input.password)) {
    return left(UserDomainError.notExists(input.email.value));
  }

  return tokenFactory.build(user);
};
