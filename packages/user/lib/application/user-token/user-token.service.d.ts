import { StringVO } from '@oumi-package/core';
import { Either } from 'fp-ts/lib/Either';
import {
  Token,
  TokenDomainError,
  TokenFactory,
  UserDomainError,
  UserEmail,
  UserQueryRepository,
} from '../../domain';
export declare type UserTokenResponse = Token;
export declare type UserTokenService = (input: {
  email: UserEmail;
  password: StringVO;
}) => Promise<Either<UserDomainError | TokenDomainError, UserTokenResponse>>;
export declare type UserTokenBuilder = (options: {
  queryRepository: UserQueryRepository;
  tokenFactory: TokenFactory;
}) => UserTokenService;
export declare const userTokenBuilderService: UserTokenBuilder;
//# sourceMappingURL=user-token.service.d.ts.map
