import { left, right } from 'fp-ts/lib/Either';
import { decode, encode } from 'jwt-simple';

import {
  Token,
  TokenDomainError,
  TokenFactory,
  TokenReader,
  userIdVO,
} from '../domain';

// Types

export type SimpleJWTFactory = (options: {
  expiration: number;
  issuer: string;
  secret: string;
}) => TokenFactory;

export type SimpleJWTReader = (secret: string) => TokenReader;

// Impl

export const simpleJWTFactory: SimpleJWTFactory = ({
  secret,
  expiration,
  issuer,
}) => ({
  build: user => {
    const payload = {
      exp: expiration,
      iat: Date.now(),
      issuer,
      sub: user.id.value,
    };
    try {
      return Promise.resolve(right(encode(payload, secret) as Token));
    } catch (err) {
      return Promise.resolve(left(TokenDomainError.invalidPayload(payload)));
    }
  },
});

export const simpleJWTReader: SimpleJWTReader = secret => ({
  read: token => {
    try {
      const payload: { exp: number; sub: string } = decode(token, secret);

      return Promise.resolve(
        payload.exp <= Date.now()
          ? left(TokenDomainError.notValid(token))
          : right(userIdVO(payload.sub)),
      );
    } catch (error) {
      return Promise.resolve(left(TokenDomainError.notValid(token)));
    }
  },
});
