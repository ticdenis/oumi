// tslint:disable-next-line:no-implicit-dependencies
import { uuid } from 'io-ts-types/lib/string/uuid';
import { v4 } from 'uuid';

import { domainError } from '../domain-error';

import { ValueObject } from './value-object';

export type Uuid = Readonly<string>;

export type UuidVO = ValueObject<Uuid>;

export const uuidVO = (value?: string): ValueObject<Uuid> => {
  const validation = uuid.decode(value || v4());

  if (validation.isLeft()) {
    throw domainError('invalid_uuid', validation.value.toString());
  }

  return {
    equalsTo: other => other.value === validation.value,
    value: validation.value,
  };
};

