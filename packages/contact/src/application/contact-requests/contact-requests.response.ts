import { DataTransformer } from '@oumi-package/core';

import * as R from 'ramda';

import { ContactRequest } from '../..';

export type ContactRequestsResponse = {
  fullname: string;
  id: string;
  message: string | null;
  nickname: string;
}[];

export const contactRequestsTransformer: DataTransformer<
  ContactRequest[],
  ContactRequestsResponse
> = R.map(contactRequest => ({
  fullname: contactRequest.fullname.value,
  id: contactRequest.id.value,
  message: contactRequest.message.value,
  nickname: contactRequest.nickname.value,
}));
