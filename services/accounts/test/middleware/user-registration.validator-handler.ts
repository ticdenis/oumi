import { Oumi } from '@oumi-package/shared/lib/core';
import {
  UserFirstnameStub,
  UserIdStub,
  UserLastnameStub,
  UserNicknameStub,
} from '@oumi-package/shared/lib/infrastructure/test/user.stubs';
import {
  UserEmailStub,
  UserPasswordNotEncryptedStub,
  UserPhoneStub,
} from '@oumi-package/user/lib/infrastructure/test/user.stubs';

import { Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { userRegistrationValidatorHandler } from '../../src/middleware';

describe('user registration POST validator handler', () => {
  let context: {
    container: Oumi.Container;
    next: express.NextFunction;
  };

  beforeEach(done => {
    context = {
      container: Substitute.for<Oumi.Container>(),
      next: jest.fn(),
    };

    done();
  });

  test('not pass validation', async done => {
    // Given
    const req: express.Request = Substitute.for<express.Request>();
    const res: express.Response = (() => {
      const _res: any = {};
      _res.status = jest.fn().mockReturnValue(_res);
      _res.json = jest.fn().mockReturnValue(_res);
      return _res;
    })();
    // When
    await userRegistrationValidatorHandler(context.container)(
      req,
      res,
      context.next,
    );
    // Then
    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(context.next).not.toHaveBeenCalled();
    done();
  });

  test('pass validation', async done => {
    // Given
    const req: express.Request = {
      body: {
        email: UserEmailStub.value,
        firstname: UserFirstnameStub.value,
        id: UserIdStub.value,
        lastname: UserLastnameStub.value,
        nickname: UserNicknameStub.value,
        password: UserPasswordNotEncryptedStub.value,
        phone: UserPhoneStub.value,
      },
    } as any;
    const res = Substitute.for<express.Response>();
    // When
    await userRegistrationValidatorHandler(context.container)(
      req,
      res,
      context.next,
    );
    // Then
    expect(context.next).toHaveBeenCalled();
    done();
  });
});
