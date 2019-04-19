import ava, { TestInterface } from 'ava';

import { ValueObjectDomainError } from '../../src/core';
import {
  userFirstnameVO,
  userIdVO,
  userLastnameVO,
  userNicknameVO,
} from '../../src/domain/user.props';

const test = ava as TestInterface<{
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
}>;

test.before(t => {
  t.context.firstname = 'name';
  t.context.id = 'B7802DDE-CAF0-498E-9993-43B8B5D4EFA2';
  t.context.lastname = 'lastname';
  t.context.nickname = 'nickname';
});

test('should create a firstname value object', t => {
  // When
  const vo = userFirstnameVO(t.context.firstname);
  // Then
  t.is(vo.value, t.context.firstname);
});

test('should throw an error creating a firstname value object', t => {
  // Given
  const value = 0;
  // When
  const fn = () => userFirstnameVO(value as any);
  // Then
  t.throws(fn, ValueObjectDomainError);
});

test('should create a id value object', t => {
  // When
  const vo = userIdVO(t.context.id);
  // Then
  t.is(vo.value, t.context.id);
});

test('should throw an error creating a id value object', t => {
  // Given
  const value = 'user-id';
  // When
  const fn = () => userIdVO(value);
  // Then
  t.throws(fn, ValueObjectDomainError);
});

test('should create a lastname value object', t => {
  // When
  const vo = userLastnameVO(t.context.lastname);
  // Then
  t.is(vo.value, t.context.lastname);
});

test('should throw an error creating a lastname value object', t => {
  // Given
  const value = 0;
  // When
  const fn = () => userLastnameVO(value as any);
  // Then
  t.throws(fn, ValueObjectDomainError);
});

test('should create a nickname value object', t => {
  // When
  const vo = userNicknameVO(t.context.nickname);
  // Then
  t.is(vo.value, t.context.nickname);
});

test('should throw an error creating a nickname value object', t => {
  // Given
  const value = 0;
  // When
  const fn = () => userNicknameVO(value as any);
  // Then
  t.throws(fn, ValueObjectDomainError);
});
