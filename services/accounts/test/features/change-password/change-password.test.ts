import Substitute from '@fluffy-spoon/substitute';
import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';

import {
  EventPublisher,
  generateUserStub,
  loadContainer,
  Oumi,
  SERVICE_ID,
  User,
  userEmailVO,
  userFirstnameVO,
  UserId,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
  userPasswordVO,
  userPhoneVO,
} from '../../helpers/domain-imports';

import { step1, step2, step3 } from './steps';

export interface Context {
  body: { newPassword: string; oldPassword: string };
  container: Oumi.Container;
  res: supertest.Response;
  token: string;
  user: User;
}

defineFeature(
  loadFeature('./test/features/change-password/change-password.feature'),
  test => {
    const context: Context = {
      container: loadContainer(),
    } as any;

    beforeEach(done => {
      context.user = generateUserStub({
        email: userEmailVO('test@oumi.com'),
        firstname: userFirstnameVO('Test'),
        id: userIdVO('DEBE0D06-3C96-42A3-8083-461653208E7D'),
        lastname: userLastnameVO('Er'),
        nickname: userNicknameVO('oumi'),
        password: userPasswordVO('secret'),
        phone: userPhoneVO('123456789'),
      });

      context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

      context.container.set<EventPublisher>(
        SERVICE_ID.EVENT_PUBLISHER,
        Substitute.for<EventPublisher>(),
      );

      done();
    });

    test('Should change password', step1(context));

    test('Should throw a user error not found', step2(context));

    test('Should throw a password not match error', step3(context));
  },
);
