import * as t from 'io-ts';
import { v4 } from 'uuid';

import { domainError } from '../domain-error';

import { ValueObject } from './value-object';

const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const isUuid = (u: unknown): u is string =>
  typeof u === 'string' && regex.test(u);

const UUID_TYPE = new t.Type<string, string, unknown>(
  'uuid',
  isUuid,
  (u, c) => (isUuid(u) ? t.success(u) : t.failure(u, c)),
  t.identity,
);

export type Uuid = Readonly<string>;

export type UuidVO = ValueObject<Uuid>;

export const uuidVO = (value?: string): ValueObject<Uuid> => {
  const validation = UUID_TYPE.decode(value || v4());

  if (validation.isLeft()) {
    throw domainError('invalid_uuid', validation.value.toString());
  }

  return {
    equalsTo: other => other.value === validation.value,
    value: validation.value,
  };
};
