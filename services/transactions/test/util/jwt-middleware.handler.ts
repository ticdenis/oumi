import { Oumi } from '@oumi-package/shared/lib/core';
import { UserIdStub } from '@oumi-package/shared/lib/infrastructure/test/user.stubs';
import { TokenDomainError, TokenReader, UserId } from '@oumi-package/user/lib';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as HttpStatus from 'http-status-codes';

import { loadContainer, SERVICE_ID } from '../../src/config';
import { jwtMiddleware } from '../../src/util';

describe('jwt middleware handler', () => {
  let context: {
    container: Oumi.Container;
    next: express.NextFunction;
  };

  beforeEach(done => {
    context = {
      container: loadContainer(),
      next: jest.fn(),
    };
    done();
  });

  test('not pass authorization', async done => {
    // Given
    const req: express.Request = {
      headers: {
        authorization: undefined,
      },
    } as any;
    const res: express.Response = (() => {
      const _res: any = {};
      _res.status = jest.fn().mockReturnValue(_res);
      _res.json = jest.fn().mockReturnValue(_res);
      return _res;
    })();
    const fakeTokenReader = Substitute.for<TokenReader>();
    fakeTokenReader
      .read(Arg.any())
      .returns(fromLeft(new TokenDomainError('test', 'test')));
    context.container.set<TokenReader>(
      SERVICE_ID.TOKEN_READER,
      fakeTokenReader,
    );
    // When
    await jwtMiddleware(context.container)(req, res, context.next);
    // Then
    expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(context.next).not.toHaveBeenCalled();
    done();
  });

  test('pass authorization', async done => {
    // Given
    const req: express.Request = {
      headers: {
        authorization: 'valid-authorization',
      },
    } as any;
    const res: express.Response = (() => {
      const _res: any = {};
      _res.status = jest.fn().mockReturnValue(_res);
      _res.json = jest.fn().mockReturnValue(_res);
      return _res;
    })();
    const fakeTokenReader = Substitute.for<TokenReader>();
    fakeTokenReader.read(Arg.any()).returns(fromEither(right(UserIdStub)));
    context.container.set<TokenReader>(
      SERVICE_ID.TOKEN_READER,
      fakeTokenReader,
    );
    // When
    await jwtMiddleware(context.container)(req, res, context.next);
    // Then
    expect(context.container.get<UserId>(SERVICE_ID.USER_ID)).toBeTruthy();
    expect(context.next).toHaveBeenCalled();
    done();
  });
});
