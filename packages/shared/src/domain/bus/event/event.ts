import * as R from 'ramda';

import { stringVO } from '../..';
import { message, Message } from '../message';

export interface Event<T> extends Message {
  readonly data: T;
  readonly occurredOn: Date;
}

export const event = <T>(data: T): Event<T> =>
  R.merge(message(), {
    data,
    occurredOn: new Date(),
    type: stringVO('event').value,
  });
