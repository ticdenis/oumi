import ava, { TestInterface } from 'ava';

import {
  User,
  UserConstructor,
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userPasswordVO,
  userPhoneVO,
} from '../../src/domain';

const test = ava as TestInterface<UserConstructor>;

test.before(t => {
  t.context.email = userEmailVO('uomi@test.com');
  t.context.firstname = userFirstnameVO('name');
  t.context.id = userIdVO();
  t.context.lastname = userLastnameVO('surname');
  t.context.password = userPasswordVO('secret');
  t.context.phone = userPhoneVO('612345678');
});

test('should create an user', t => {
  // Given
  const args = t.context;
  // When
  const user = User.create(args);
  // Then
  t.true(user instanceof User);
  t.truthy(user.email);
  t.truthy(user.firstname);
  t.truthy(user.id);
  t.truthy(user.lastname);
  t.truthy(user.password);
  t.truthy(user.phone);
});

test('should publish UserRegistered event after user created', t => {
  const args = t.context;
  // When
  const user = User.create(args);
  const domainEvents = user.pullDomainEvents();
  // Then
  t.truthy(domainEvents.find(event => user.id.value === event.data.id));
});
