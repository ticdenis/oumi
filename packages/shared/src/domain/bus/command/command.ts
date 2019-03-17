import * as R from 'ramda';

import { stringVO } from '../..';
import { message, Message } from '../message';

export interface Command<T> extends Message {
  readonly data: T;
  readonly name: string;
  readonly occurredOn: Date;
}

export const command = <T>(data: T, name: string): Command<T> =>
  R.merge(message(), {
    data,
    name,
    occurredOn: new Date(),
    type: stringVO('command').value,
  });
