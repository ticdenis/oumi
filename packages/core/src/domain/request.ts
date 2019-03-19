import * as R from 'ramda';

import { message, Message, stringVO } from '.';

// Types

export type Request = Message;

// Helpers

export const request = (): Request =>
  R.merge(message(), {
    type: stringVO('request').value,
  });
