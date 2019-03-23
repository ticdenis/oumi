import { CommandBus, DomainCommandBus, Oumi } from '@oumi-package/core';
import {
  UserDomainError,
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
  UserRegistrationCommand,
} from '@oumi-package/user/lib';

import { Substitute } from '@fluffy-spoon/substitute';
import express from 'express';
import * as HttpStatus from 'http-status-codes';
import supertest from 'supertest';

import { SERVICE_ID } from '../../../src/config';
import { userRegistrationPostController } from '../../../src/controller';

describe('user registration POST controller', () => {
  let context: {
    container: Oumi.Container;
    next: express.NextFunction;
    req: express.Request;
    reqBody: express.Request;
    res: express.Response;
  };

  beforeEach(done => {
    context = {
      container: (() => {
        const obj: any = {};
        return {
          get: (key: string) => obj[key],
          set: (key: string, value: any) => {
            obj[key] = value;
          },
        } as any;
      })(),
      next: jest.fn(),
      req: Substitute.for<express.Request>(),
      reqBody: {
        body: {
          email: userEmailVO('test@oumi.com').value,
          firstname: userFirstnameVO('firstname').value,
          id: userIdVO().value,
          lastname: userLastnameVO('lastname').value,
          nickname: userNicknameVO('nickname').value,
          password: userPasswordVO('secret').value,
          phone: userPhoneVO('612345678').value,
        },
      } as any,
      res: (() => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      })(),
    };

    done();
  });

  test('user data not pass validation', async () => {
    // When
    await userRegistrationPostController(context.container)(
      context.req,
      context.res,
      context.next,
    );
    // Then
    expect(context.res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  test('user email already exists', async () => {
    // Given
    const bus = DomainCommandBus.instance();
    const fakeHandler = (_: any) =>
      Promise.reject(UserDomainError.alreadyExists(context.reqBody.body.email));
    bus.addHandler(UserRegistrationCommand.name, fakeHandler);
    context.container.set<CommandBus>(SERVICE_ID.BUS.COMMAND, bus);
    // When
    await userRegistrationPostController(context.container)(
      context.reqBody,
      context.res,
      context.next,
    );
    // Then
    expect(context.res.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
  });

  test('unknown error', async () => {
    // Given
    const bus = DomainCommandBus.instance();
    const fakeHandler = (_: any) => Promise.reject(new Error());
    bus.addHandler(UserRegistrationCommand.name, fakeHandler);
    context.container.set<CommandBus>(SERVICE_ID.BUS.COMMAND, bus);
    // When
    await userRegistrationPostController(context.container)(
      context.reqBody,
      context.res,
      context.next,
    );
    // Then
    expect(context.next).toHaveBeenCalledTimes(1);
  });

  test('create an user', async () => {
    // Given
    const bus = DomainCommandBus.instance();
    bus.dispatch = (_: any) => Promise.resolve();
    context.container.set<CommandBus>(SERVICE_ID.BUS.COMMAND, bus);
    const app = express()
      .use(express.json())
      .post('/test', userRegistrationPostController(context.container));
    // When
    const res = await supertest(app)
      .post('/test')
      .send(context.reqBody.body);
    // Then
    expect(res.status).toBe(HttpStatus.CREATED);
  });
});
