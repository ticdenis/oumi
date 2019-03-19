import * as t from 'io-ts';
import { fromNullable } from 'io-ts-types';
// tslint:disable-next-line:no-implicit-dependencies
import { uuid } from 'io-ts-types/lib/string/uuid';
import { v4 } from 'uuid';

import { ValueObjectDomainError } from '.';

// Types

export interface ValueObject<T> {
  equalsTo: (other: ValueObject<T>) => boolean;
  value: T;
}

export type StringVO = ValueObject<Readonly<string>>;

export type NullableStringVO = ValueObject<Readonly<string | null>>;

export type Uuid = Readonly<string>;

export type UuidVO = ValueObject<Uuid>;

export type NumberVO = ValueObject<Readonly<number>>;

export type NullableNumberVO = ValueObject<Readonly<number | null>>;

export type IntVO = NumberVO;

export type NullableIntVO = NullableNumberVO;

export type FloatVO = NumberVO;

export type NullableFloatVO = NullableNumberVO;

// Helpers

export const simpleValueObject: <T>(value: T) => ValueObject<T> = value => ({
  equalsTo: other => other.value === value,
  value,
});

function isFloat(n: any) {
  return n === 0 || (Number(n) === n && n % 1 !== 0);
}

export const stringVO = (value: string): StringVO => {
  if (t.string.decode(value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_STRING', value);
  }

  return simpleValueObject<Readonly<string>>(value);
};

export const nullableStringVO = (value: string | null): NullableStringVO => {
  if (
    fromNullable(t.string)('')
      .decode(value)
      .isLeft()
  ) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_STRING', value);
  }

  return simpleValueObject<Readonly<string | null>>(value);
};

export const uuidVO = (value?: string): ValueObject<Uuid> => {
  const _value = value || v4();

  if (uuid.decode(_value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_UUID', value);
  }

  return simpleValueObject<Uuid>(value);
};

export const numberVO = (value: number): NumberVO => {
  if (t.number.decode(value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_NUMBER', value);
  }

  return simpleValueObject<Readonly<number>>(value);
};

export const nullableNumberVO = (value: number | null): NullableNumberVO => {
  if (
    fromNullable(t.number)(0)
      .decode(value)
      .isLeft()
  ) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_NUMBER', value);
  }

  return simpleValueObject<Readonly<number | null>>(value);
};

export const intVO = (value: number): IntVO => {
  if (t.Int.decode(value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_INT', value);
  }

  return simpleValueObject<Readonly<number>>(value);
};

export const nullableIntVO = (value: number | null): NullableIntVO => {
  if (
    fromNullable(t.Integer)(0)
      .decode(value)
      .isLeft()
  ) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_INT', value);
  }

  return simpleValueObject<Readonly<number | null>>(value);
};

export const floatVO = (value: number): FloatVO => {
  if (!isFloat(value)) {
    throw new ValueObjectDomainError('INVALID_INT', value);
  }

  return simpleValueObject<Readonly<number>>(value);
};

export const nullableFloatVO = (value: number | null): NullableFloatVO => {
  if (value !== null && !isFloat(value)) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_FLOAT', value);
  }

  return simpleValueObject<Readonly<number | null>>(value);
};
