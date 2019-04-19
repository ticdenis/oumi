import { NullableStringVO } from '@oumi-package/shared/lib/core';
import {
  userIdVO,
  userNicknameVO,
} from '@oumi-package/shared/lib/domain/user.props';

import ava, { TestInterface } from 'ava';

import { Contact, ContactDomainError } from './../../src/domain';
import {
  ContactMessageStub,
  generateContactStub,
} from './../../src/infrastructure/test/contact.stubs';

const test = ava as TestInterface<{
  contactA: Contact;
  contactB: Contact;
  message: NullableStringVO;
}>;

test.beforeEach(t => {
  t.context.contactA = generateContactStub({
    id: userIdVO(),
    nickname: userNicknameVO('contactA'),
    requests: [],
  });
  t.context.contactB = generateContactStub({
    id: userIdVO(),
    nickname: userNicknameVO('contactB'),
    requests: [],
  });
  t.context.message = ContactMessageStub;
});

test('should error a contact', t => {
  // When
  const fn = () => {
    t.context.contactA.newRequest(t.context.contactB, t.context.message);
    t.context.contactA.newRequest(t.context.contactB, t.context.message);
  };
  // Then
  t.throws(fn, ContactDomainError);
});

test('should create an contact', t => {
  // When
  t.context.contactA.newRequest(t.context.contactB, t.context.message);
  // Then
  t.is(t.context.contactA.requests.length, 1);
  t.is(t.context.contactB.requests.length, 1);
});

test('should publish newRequested event after contact created', t => {
  // When
  t.context.contactA.newRequest(t.context.contactB, t.context.message);
  // Then
  t.is(t.context.contactA.pullDomainEvents().length, 1);
});
