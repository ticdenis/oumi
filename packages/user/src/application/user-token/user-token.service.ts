import { StringVO } from '@oumi-package/shared/lib/core';

import { Either, left } from 'fp-ts/lib/Either';
import * as R from 'ramda';

import {
  TokenDomainError,
  TokenFactory,
  UserDomainError,
  UserEmail,
  UserQueryRepository,
} from '../../domain';

import { UserTokenResponse } from '.';

export type UserTokenService = (input: {
  email: UserEmail;
  password: StringVO;
}) => Promise<Either<UserDomainError | TokenDomainError, UserTokenResponse>>;

export type UserTokenBuilder = (options: {
  queryRepository: UserQueryRepository;
  tokenFactory: TokenFactory;
}) => UserTokenService;

export const userTokenBuilderService: UserTokenBuilder = ({
  queryRepository,
  tokenFactory,
}) => input =>
  R.pipe(
    () => queryRepository.ofEmail(input.email).run(),
    R.then(
      R.ifElse(
        user => user.isRight() && user.value.password.equalsTo(input.password),
        user => tokenFactory.build(user.value).run(),
        () => left(UserDomainError.notExists(input.email.value)),
      ),
    ),
  )();
