import * as t from 'io-ts';

import { domainError } from '../domain-error';

import { ValueObject } from './value-object';

export type StringVO = ValueObject<Readonly<string>>;

export const stringVO = (value: string): StringVO => {
  const validation = t.string.decode(value);

  if (validation.isLeft()) {
    throw domainError('invalid_string', validation.value.toString());
  }

  return {
    equalsTo: other => other.value === validation.value,
    value: validation.value,
  };
};

const isNullableString = (u: unknown): u is string =>
  typeof u === 'string' || null === u;

const NULLABLE_STRING_TYPE = new t.Type<string | null, string | null, unknown>(
  'nullable_string',
  isNullableString,
  (u, c) => (isNullableString(u) ? t.success(u) : t.failure(u, c)),
  t.identity,
);

export type NullableStringVO = ValueObject<Readonly<string | null>>;

export const nullableStringVO = (value: string | null): NullableStringVO => {
  const validation = NULLABLE_STRING_TYPE.decode(value);

  if (validation.isLeft()) {
    throw domainError('invalid_nullable_string', validation.value.toString());
  }

  return {
    equalsTo: other => other.value === validation.value,
    value: validation.value,
  };
};
