import ava, { TestInterface } from 'ava';
import { User, UserConstructor, UserRegistered } from '../../src/domain';
import {
  DomainEventPublisher,
  DomainEventSubscriber,
} from '@oumi-package/shared';
import {
  userEmailVO,
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userPasswordVO,
} from '../../src/domain/value-object';

const test = ava as TestInterface<UserConstructor>;

test.before(t => {
  t.context.email = userEmailVO('uomi@test.com');
  t.context.firstname = userFirstnameVO('name');
  t.context.id = userIdVO();
  t.context.lastname = userLastnameVO('surname');
  t.context.password = userPasswordVO('secret');
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
});

test('should publish UserRegistered event after user created', t => {
  // Given
  const eventSubscriberId = DomainEventPublisher.instance().subscribe(
    DomainEventSubscriber.instance(),
  );
  const args = t.context;
  // When
  const user = User.create(args);
  DomainEventPublisher.instance().unsubscribe(eventSubscriberId);
  // Then
  t.truthy(
    DomainEventSubscriber.instance()
      .events<UserRegistered>()
      .find(event => user.id.value === event.data.id),
  );
});
