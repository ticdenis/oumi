import * as t from 'io-ts';
import { fromNullable } from 'io-ts-types';
import { date } from 'io-ts-types/lib/Date/date';
import { uuid } from 'io-ts-types/lib/string/uuid';
import { v4 } from 'uuid';

import { ValueObjectDomainError } from './';

// Types

export interface ValueObject<T> {
  readonly equalsTo: (other: ValueObject<T>) => boolean;
  readonly value: T;
}

export type StringVO = ValueObject<string>;

export type NullableStringVO = ValueObject<string | null>;

export type Uuid = string;

export type UuidVO = ValueObject<Uuid>;

export type NumberVO = ValueObject<number>;

export type NullableNumberVO = ValueObject<number | null>;

export type IntVO = NumberVO;

export type NullableIntVO = NullableNumberVO;

export type FloatVO = NumberVO;

export type NullableFloatVO = NullableNumberVO;

export type DateVO = ValueObject<Date>;

export type IntervalDateVO = ValueObject<{ end: Date; start: Date }>;

export type NullableDateVO = ValueObject<Date | null>;

// Helpers

export const simpleValueObject: <T>(value: T) => ValueObject<T> = value => ({
  equalsTo: other => other.value === value,
  value,
});

function isFloat(n: any) {
  return Number.isInteger(n) || (n === 0 || (Number(n) === n && n % 1 !== 0));
}

export const stringVO = (value: string): StringVO => {
  if (t.string.decode(value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_STRING', value);
  }

  return simpleValueObject<string>(value);
};

export const nullableStringVO = (value: string | null): NullableStringVO => {
  if (
    fromNullable(t.string)('')
      .decode(value)
      .isLeft()
  ) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_STRING', value);
  }

  return simpleValueObject<string | null>(value);
};

export const uuidVO = (value?: string): ValueObject<Uuid> => {
  const _value = value || v4();

  if (uuid.decode(_value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_UUID', value);
  }

  return simpleValueObject<Uuid>(_value);
};

export const numberVO = (value: number): NumberVO => {
  if (t.number.decode(value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_NUMBER', value);
  }

  return simpleValueObject<number>(value);
};

export const nullableNumberVO = (value: number | null): NullableNumberVO => {
  if (
    fromNullable(t.number)(0)
      .decode(value)
      .isLeft()
  ) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_NUMBER', value);
  }

  return simpleValueObject<number | null>(value);
};

export const intVO = (value: number): IntVO => {
  if (t.Int.decode(value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_INT', value);
  }

  return simpleValueObject<number>(value);
};

export const nullableIntVO = (value: number | null): NullableIntVO => {
  if (
    // tslint:disable-next-line: deprecation
    fromNullable(t.Integer)(0)
      .decode(value)
      .isLeft()
  ) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_INT', value);
  }

  return simpleValueObject<number | null>(value);
};

export const floatVO = (value: number): FloatVO => {
  if (!isFloat(value)) {
    throw new ValueObjectDomainError('INVALID_INT', value);
  }

  return simpleValueObject<number>(value);
};

export const nullableFloatVO = (value: number | null): NullableFloatVO => {
  if (value !== null && !isFloat(value)) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_FLOAT', value);
  }

  return simpleValueObject<number | null>(value);
};

export const dateVO = (value: Date): DateVO => {
  if (date.decode(value).isLeft()) {
    throw new ValueObjectDomainError('INVALID_DATE', value);
  }

  return simpleValueObject<Date>(value);
};

export const nullableDateVO = (value: Date | null): NullableDateVO => {
  if (
    fromNullable(date)(new Date())
      .decode(value)
      .isLeft()
  ) {
    throw new ValueObjectDomainError('INVALID_NULLABLE_DATE', value);
  }

  return simpleValueObject<Date | null>(value);
};

export const intervalDateVO = (value: {
  end: Date;
  start: Date;
}): IntervalDateVO => {
  if (value.end.getMilliseconds() < value.start.getMilliseconds()) {
    throw new ValueObjectDomainError('INVALID_INTERVAL_DATE', value);
  }

  return simpleValueObject<{ end: Date; start: Date }>(value);
};
