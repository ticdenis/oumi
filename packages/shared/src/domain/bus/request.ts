import * as R from 'ramda';

import { stringVO } from '..';

import { message, Message } from './message';

export type Request = Message;

export const request = (): Request =>
  R.merge(message(), {
    type: stringVO('request').value,
  });
