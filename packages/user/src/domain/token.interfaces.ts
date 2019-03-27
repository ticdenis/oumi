import { Either } from 'fp-ts/lib/Either';

import { User, UserId } from '.';
import { TokenDomainError } from './token.errors';

export type Token = string;

export interface TokenFactory {
  build(user: User): Promise<Either<TokenDomainError, Token>>;
}

export interface TokenReader {
  read(token: Token): Promise<Either<TokenDomainError, UserId>>;
}
