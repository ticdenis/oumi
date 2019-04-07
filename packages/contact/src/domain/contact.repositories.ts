import {
  UserId,
  UserNickname,
} from '@oumi-package/shared/lib/domain/user.props';

import { TaskEither } from 'fp-ts/lib/TaskEither';

import { Contact } from '.';

export interface ContactCommandRepository {
  newRequest(requester: Contact, contact: Contact): Promise<void>;
}

export interface ContactQueryRepository {
  allOfId(id: UserId): TaskEither<null, Contact[]>;
  ofId(id: UserId): TaskEither<null, Contact>;
  ofNickname(nickname: UserNickname): TaskEither<null, Contact>;
}
