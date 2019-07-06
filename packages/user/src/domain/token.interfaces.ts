import { TaskEither } from 'fp-ts/lib/TaskEither';

import { User, UserId } from '.';
import { TokenDomainError } from './token.errors';

export type Token = string;

export interface TokenFactory {
  build(user: User): TaskEither<TokenDomainError, Token>;
}

export interface TokenReader {
  read(token: Token): TaskEither<TokenDomainError, UserId>;
}
