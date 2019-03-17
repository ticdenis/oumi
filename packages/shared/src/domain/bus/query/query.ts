import * as R from 'ramda';

import { stringVO } from '../..';
import { request, Request } from '../request';

export interface Query<T> extends Request {
  readonly data: T;
  readonly name: string;
  readonly occurredOn: Date;
}

export const query = <T>(data: T, name: string): Query<T> =>
  R.merge(request(), {
    data,
    name,
    occurredOn: new Date(),
    type: stringVO('query').value,
  });
