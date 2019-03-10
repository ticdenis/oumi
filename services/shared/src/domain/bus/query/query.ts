import * as R from 'ramda';

import { stringVO } from '../../value-object';
import { request, Request } from '../request';

export type Query = Request;

export const query = (): Query =>
  R.merge(request(), {
    type: stringVO('query').value,
  });
