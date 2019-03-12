import * as R from 'ramda';

import { stringVO } from '../../value-object';
import { message, Message } from '../message';

export interface Command<T> extends Message {
  readonly data: T;
  readonly occurredOn: Date;
}

export const command = <T>(data: T): Command<T> =>
  R.merge(message(), {
    data,
    occurredOn: new Date(),
    type: stringVO('command').value,
  });
