import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';

import {
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

import { step1, step2 } from './steps';

export interface Context {
  container: Oumi.Container;
  res: supertest.Response;
  token: string;
  user: User;
}

defineFeature(loadFeature('./test/features/profile/profile.feature'), test => {
  const context: Context = {
    container: loadContainer(),
  } as any;

  beforeEach(done => {
    context.user = generateUserStub({
      email: userEmailVO('test@oumi.com'),
      firstname: userFirstnameVO('Test'),
      id: userIdVO('A2573A06-538D-46EA-B992-BD9AC911ED18'),
      lastname: userLastnameVO('Er'),
      nickname: userNicknameVO('oumi'),
      password: userPasswordVO('secret'),
      phone: userPhoneVO('123456789'),
    });

    context.container.set<UserId>(SERVICE_ID.USER_ID, context.user.id);

    done();
  });

  test('Should get profile', step1(context));

  test('Should throw a profile error not found', step2(context));
});
